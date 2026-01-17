const GridBox = ({ char, type, config, index, svgData, failed, onClick }) => {
    const isReference = type === 'reference';
    const showTrace = index < config.traceCount;
    const { gridType, gridOpacity } = config; 
    const gridColor = `rgba(0, 0, 0, ${gridOpacity})`;
    const refStyle = isReference ? { '--guide-scale': config.guideScale, '--guide-x': `${config.guideX}px`, '--guide-y': `${config.guideY}px` } : {};

    return (
        <div 
        className={`relative w-[16mm] h-[16mm] border-r border-b box-border flex justify-center items-center overflow-hidden bg-transparent ${isReference ? 'reference-box cursor-pointer hover:bg-indigo-50 transition-colors duration-200' : ''}`}
        style={{ borderColor: gridColor }}
        onClick={isReference ? onClick : undefined} 
        title={isReference ? "Bấm để xem cách viết" : ""}
        >
        <div className="absolute inset-0 pointer-events-none z-0">
            {gridType !== 'blank' && (
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <line x1="50" y1="0" x2="50" y2="100" stroke="black" strokeOpacity={gridOpacity} strokeWidth="0.5" strokeDasharray="4 4" /><line x1="0" y1="50" x2="100" y2="50" stroke="black" strokeOpacity={gridOpacity} strokeWidth="0.5" strokeDasharray="4 4" />
            </svg>
            )}
        </div>
        {char && (
            <>
            {isReference && (
                <div className="relative z-20 w-full h-full flex items-center justify-center p-[1px]">
                    {!failed && svgData ? (<div className="ref-wrapper" style={refStyle} dangerouslySetInnerHTML={{ __html: svgData }} />) : (
                    <span className="kanji-trace !text-black flex justify-center items-center h-full w-full" style={{ fontSize: `${config.fontSize}pt`, color: 'black', transform: `translateY(${config.verticalOffset}px)`, textShadow: 'none', webkitTextStroke: '0' }}>{char}</span>
                    )}
                    <div className="absolute bottom-0.5 right-0.5 opacity-0 hover:opacity-0 text-indigo-400 pointer-events-none transition-opacity">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
                    </div>
                </div>
            )}
            {!isReference && showTrace && (
                <span className="kanji-trace" style={{ fontSize: `${config.fontSize}pt`, transform: `translateY(${config.verticalOffset}px)`, color: `rgba(0, 0, 0, ${config.traceOpacity})`, fontFamily: config.fontFamily }}>{char}</span>
            )}
            </>
        )}
        </div>
    );
};
window.GridBox = GridBox;
