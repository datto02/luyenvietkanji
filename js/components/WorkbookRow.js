const WorkbookRow = ({ char, config, dbData }) => {
    // Dùng hook từ window
    const { loading, paths, fullSvg, failed } = window.useKanjiSvg(char);
    const { useState } = React;
    const [isAnimOpen, setIsAnimOpen] = useState(false);
    
    // Lấy components từ window
    const HeaderSection = window.HeaderSection;
    const GridBox = window.GridBox;
    const KanjiAnimationModal = window.KanjiAnimationModal;

    const boxes = Array.from({ length: 12 }, (_, i) => i);
    const gridBorderColor = `rgba(0, 0, 0, ${config.gridOpacity})`;

    return (
        <div className="flex flex-col w-full px-[8mm]">
            <HeaderSection char={char} paths={paths} loading={loading} failed={failed} config={config} dbData={dbData} />
            <div className="flex border-l border-t w-fit" style={{ borderColor: gridBorderColor }}>
                {boxes.map((i) => (
                <GridBox key={i} index={i} char={char} type={i === 0 ? 'reference' : 'trace'} config={config} svgData={fullSvg} failed={failed} onClick={i === 0 ? () => setIsAnimOpen(true) : undefined} />
                ))}
            </div>
            <KanjiAnimationModal char={char} paths={paths} fullSvg={fullSvg} dbData={dbData} isOpen={isAnimOpen} onClose={() => setIsAnimOpen(false)} />
        </div>
    );
};
window.WorkbookRow = WorkbookRow;
