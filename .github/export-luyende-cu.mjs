// Xuất các ĐỀ CŨ của Luyện đề (đề đã mở: da_mo = true) từ Supabase ra file JSON tĩnh để web đọc thẳng từ GitHub Pages,
// không hỏi Supabase mỗi lần (mỗi request là 1 dòng log + 1 dòng preflight). Chạy tự động mỗi ngày lúc 00:15 giờ VN bởi
// .github/workflows/luyende-cu.yml (sau khi cron của Supabase chốt bài lúc 00:00); chạy tay để thử:
//   SUPABASE_URL=... SUPABASE_ANON_KEY=... OUT_DIR=./tmp node public/.github/export-luyende-cu.mjs
//
// AN TOÀN: chỉ dùng KEY CÔNG KHAI (anon - web vẫn dùng sẵn) nên chỉ đọc được đúng những dòng RLS cho mọi người đọc
// (da_mo = true). KHÔNG BAO GIỜ xuất đề hôm nay / đề chưa tới lượt. Lỗi mạng/trả về bất thường -> KHÔNG đụng vào file
// đang có (không xoá nhầm khi Supabase trục trặc).
//
// Cấu trúc:  <OUT_DIR>/<cấp n5..n1>/list.json  (danh sách: id, ten_bai_tap, thu_tu, id_link, loai_de - mới nhất trước)
//            <OUT_DIR>/<cấp>/<id_link>.json    (đủ nội dung 1 đề - đúng các cột web đang select khi mở đề)
//            <OUT_DIR>/<cấp>/today.json        (đề HÔM NAY: { date: ngày VN, thu_tu, exercise } - web chỉ dùng khi date = hôm nay)
import { mkdirSync, writeFileSync, readFileSync, readdirSync, rmSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const URL_BASE = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_ANON_KEY;
const OUT_DIR = process.env.OUT_DIR || 'data/luyende-cu';
const LEVELS = ['n5', 'n4', 'n3', 'n2', 'n1'];
const COLUMNS = 'id,ten_bai_tap,tron_cau_hoi,tron_dap_an,questions,id_link,flashcard,de_chua,thu_tu,loai_de';
const SAFE_CODE = /^[A-Za-z0-9_-]{1,64}$/;

if (!URL_BASE || !KEY) { console.error('Thiếu SUPABASE_URL / SUPABASE_ANON_KEY'); process.exit(1); }

async function fetchLevel(lv) {
    const res = await fetch(`${URL_BASE}/rest/v1/bai_tap_${lv}?select=${COLUMNS}&da_mo=eq.true&order=thu_tu.desc`, {
        headers: { apikey: KEY, Authorization: `Bearer ${KEY}` },
    });
    if (!res.ok) throw new Error(`bai_tap_${lv}: HTTP ${res.status}`);
    const rows = await res.json();
    if (!Array.isArray(rows)) throw new Error(`bai_tap_${lv}: dữ liệu không phải mảng`);
    return rows;
}

// Ghi file CHỈ khi nội dung khác (đỡ đổi mtime; git vốn đã so nội dung).
function writeIfChanged(file, text) {
    if (existsSync(file) && readFileSync(file, 'utf8') === text) return false;
    writeFileSync(file, text);
    return true;
}

// ĐỀ HÔM NAY của 1 cấp (số đề chốt bởi cron 00:00 của Supabase) - policy "chi xem bai hom nay" cho đọc bất kỳ giờ nào; khung mở 6h-22h
// do WEB tự chặn. Trả về { thu_tu, exercise } (exercise null = hôm nay CHƯA CÓ bài), hoặc null nếu lấy lỗi/không đọc được dòng (KHÔNG ghi
// today.json trong trường hợp đó: web thấy file thiếu/ngày cũ sẽ tự quay về hỏi Supabase, an toàn hơn là ghi "không có bài" sai).
async function fetchToday(lv) {
    const rpc = await fetch(`${URL_BASE}/rest/v1/rpc/current_thu_tu`, {
        method: 'POST',
        headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ cap_do: lv }),
    });
    if (!rpc.ok) throw new Error(`current_thu_tu(${lv}): HTTP ${rpc.status}`);
    const cur = Number(await rpc.json());
    if (!Number.isInteger(cur) || cur < 0) throw new Error(`current_thu_tu(${lv}): giá trị lạ`);
    if (cur === 0) return { thu_tu: 0, exercise: null };
    const res = await fetch(`${URL_BASE}/rest/v1/bai_tap_${lv}?select=${COLUMNS}&thu_tu=eq.${cur}&limit=1`, {
        headers: { apikey: KEY, Authorization: `Bearer ${KEY}` },
    });
    if (!res.ok) throw new Error(`bai_tap_${lv} hôm nay: HTTP ${res.status}`);
    const rows = await res.json();
    if (!Array.isArray(rows) || rows.length === 0) return null; // chưa đọc được (vd policy chưa áp dụng) -> không ghi
    return { thu_tu: cur, exercise: rows[0] };
}

const result = {};
for (const lv of LEVELS) result[lv] = await fetchLevel(lv); // lỗi ở bất kỳ cấp nào -> ném ra, chưa ghi gì cả
const today = {};
for (const lv of LEVELS) today[lv] = await fetchToday(lv);
const todayVn = new Date(Date.now() + 7 * 3600 * 1000).toISOString().slice(0, 10); // ngày giờ VN "YYYY-MM-DD"

let written = 0, removed = 0;
for (const lv of LEVELS) {
    const rows = result[lv];
    const dir = join(OUT_DIR, lv);
    mkdirSync(dir, { recursive: true });
    const list = rows.map((r) => ({ id: r.id, ten_bai_tap: r.ten_bai_tap, thu_tu: r.thu_tu, id_link: r.id_link, loai_de: r.loai_de }));
    if (writeIfChanged(join(dir, 'list.json'), JSON.stringify(list))) written++;
    const keep = new Set(['list.json', 'today.json']);
    if (today[lv]) {
        if (writeIfChanged(join(dir, 'today.json'), JSON.stringify({ date: todayVn, thu_tu: today[lv].thu_tu, exercise: today[lv].exercise }))) written++;
    }
    for (const r of rows) {
        if (!r.id_link || !SAFE_CODE.test(r.id_link)) continue;
        const name = `${r.id_link}.json`;
        keep.add(name);
        if (writeIfChanged(join(dir, name), JSON.stringify(r))) written++;
    }
    // Dọn file của đề không còn là đề cũ (bị xoá / gỡ da_mo) - chỉ khi lần lấy này thật sự có dữ liệu.
    if (rows.length > 0) {
        for (const f of readdirSync(dir)) {
            if (!keep.has(f) && f.endsWith('.json')) { rmSync(join(dir, f)); removed++; }
        }
    }
    console.log(`${lv}: ${rows.length} đề cũ`);
}
console.log(`Xong: ghi/cập nhật ${written} file, xoá ${removed} file.`);
