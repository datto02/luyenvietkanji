// Hàm xử lý chuỗi
const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
};

const getHex = (char) => char.codePointAt(0).toString(16).toLowerCase().padStart(5, '0');

// Hàm fetch data từ GitHub
const fetchDataFromGithub = async () => {
  try {
    // Lưu ý: Sau này bạn đẩy code lên repo của bạn thì sửa link này thành repo của bạn
    const response = await fetch('https://raw.githubusercontent.com/datto02/luyenvietkanji/refs/heads/main/kanji_db.json');
    if (!response.ok) throw new Error('Không thể tải dữ liệu');
    return await response.json();
  } catch (error) {
    console.error("Lỗi tải dữ liệu:", error);
    return null;
  }
};

const fetchKanjiData = async (char) => {
    const hex = getHex(char);
    const sources = [
        `https://cdn.jsdelivr.net/gh/KanjiVG/kanjivg@master/kanji/${hex}.svg`,
        `https://cdn.jsdelivr.net/gh/KanjiVG/kanjivg@master/kanji/${hex}-Kaisho.svg`,
        `https://cdn.jsdelivr.net/gh/parsimonhi/animCJK@master/svgsKana/${hex}.svg`,
        `https://cdn.jsdelivr.net/gh/parsimonhi/animCJK@master/svgsJa/${hex}.svg`
    ];

    for (const url of sources) {
        try {
        const res = await fetch(url);
        if (res.ok) {
            const text = await res.text();
            return { success: true, svg: text, source: url };
        }
        } catch (e) { continue; }
    }
    return { success: false };
};

// Hook: useKanjiSvg
const useKanjiSvg = (char) => {
    const { useState, useEffect, useRef } = React; // Lấy từ React toàn cục
    const [state, setState] = useState({ loading: true, paths: [], fullSvg: null, failed: false });
    const mounted = useRef(true);

    useEffect(() => {
        mounted.current = true;
        if (!char) return;
        setState({ loading: true, paths: [], fullSvg: null, failed: false });

        fetchKanjiData(char).then((result) => {
            if (!mounted.current) return;
            if (result.success) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(result.svg, "image/svg+xml");
                const pathElements = Array.from(doc.querySelectorAll('path'));
                const pathData = pathElements.map(p => p.getAttribute('d')).filter(d => d);
                const svgString = new XMLSerializer().serializeToString(doc.documentElement);
                setState({ loading: false, paths: pathData, fullSvg: svgString, failed: false });
            } else {
                setState({ loading: false, paths: [], fullSvg: null, failed: true });
            }
        });
        return () => { mounted.current = false; };
    }, [char]);

    return state;
};

// Hook: useKanjiReadings
const useKanjiReadings = (char, active) => {
    const { useState, useEffect } = React;
    const [readings, setReadings] = useState({ on: '', kun: '' });

    useEffect(() => {
        if (!char || !active) return;
        fetch(`https://kanjiapi.dev/v1/kanji/${char}`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setReadings({
                        on: data.on_readings?.join(', ') || '---',
                        kun: data.kun_readings?.join(', ') || '---'
                    });
                }
            })
            .catch(() => setReadings({ on: '---', kun: '---' }));
    }, [char, active]);

    return readings;
};

// --- QUAN TRỌNG: GÁN VÀO WINDOW ĐỂ FILE KHÁC DÙNG ĐƯỢC ---
window.removeAccents = removeAccents;
window.fetchDataFromGithub = fetchDataFromGithub;
window.useKanjiSvg = useKanjiSvg;
window.useKanjiReadings = useKanjiReadings;
