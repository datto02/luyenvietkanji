const Page = ({ chars, config, dbData }) => {
    const isSample = !config.text || config.text.trim().length === 0;
    const WorkbookRow = window.WorkbookRow;

    return (
        <div className="a4-page mx-auto relative flex flex-col pt-[15mm] pl-[3mm] bg-white">
        {isSample && (
            <div className="w-full max-w-[210mm] mb-6 text-left pl-[8mm]">
                <h2 className="text-xl font-black text-gray-600 uppercase mb-3 font-sans tracking-wide">HƯỚNG DẪN</h2>
                <div className="text-sm text-gray-500 font-medium space-y-1.5 font-sans">
                    <p className="flex items-center gap-2"><span className="bg-gray-100 text-gray-600 w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold">1</span>Nhập dữ liệu để tạo file luyện viết.</p>
                    <p className="flex items-center gap-2"><span className="bg-gray-100 text-gray-600 w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold">2</span>Ấn vào chữ mẫu đầu tiên để xem họa hoạt cách viết.</p>
                    <p className="flex items-center gap-2"><span className="bg-gray-100 text-gray-600 w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold">3</span>Có thể xem âm On/Kun trong phần "tùy chỉnh".</p>
                </div>
            </div>
        )}
        <div className="flex flex-col gap-[4mm]">
            {chars.map((char, index) => (<WorkbookRow key={`${index}-${char}`} char={char} config={config} dbData={dbData} />))}
        </div>
        <div className="absolute bottom-[5mm] left-[12.5mm] text-gray-600 text-xs font-sans">
            <div className="text-[10px]">© Bản quyền thuộc <span className="font-bold text-gray-700">Phá Đảo Tiếng Nhật</span> <span> (<span className="font-bold italic text-gray-700">phadaotiengnhat.com</span>)</span></div>
            <div className="text-[10px] mt-0.5">Tài liệu miễn phí - Nghiêm cấm mọi hành vi mua bán thương mại</div>
        </div>
        </div>
    );
};
window.Page = Page;
