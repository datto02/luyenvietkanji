const { useState, useEffect, useRef } = React;
const Sidebar = ({ config, onChange, onPrint, isMenuOpen, setIsMenuOpen, isConfigOpen, setIsConfigOpen, isCafeModalOpen, setIsCafeModalOpen, showMobilePreview, setShowMobilePreview, dbData }) => {
        const scrollRef = useRef(null);
        const [searchResults, setSearchResults] = useState([]);
        const [activeIndex, setActiveIndex] = useState(0); 
        const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
        const [isDocsModalOpen, setIsDocsModalOpen] = useState(false);

        // --- CHẶN TUYỆT ĐỐI CTRL + P (KHÔNG CÓ GÌ XẢY RA) ---
      useEffect(() => {
        const handleKeyDown = (e) => {
          // Kiểm tra Ctrl + P (Win) hoặc Command + P (Mac)
          if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
            e.preventDefault(); // Chặn trình duyệt mở bảng in
            e.stopPropagation(); // Chặn sự kiện lan truyền
            return false; // Kết thúc ngay lập tức, không làm gì cả
          }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
      }, []);
        
// --- CHẶN CUỘN TRANG KHI MỞ MODAL ---
useEffect(() => {
    // Nếu khung In hoặc khung Tài liệu đang mở
    if (isPrintModalOpen || isDocsModalOpen) {
        document.body.style.overflow = 'hidden'; // Khóa cuộn
    } else {
        document.body.style.overflow = 'unset';  // Mở lại cuộn bình thường
    }
    // Dọn dẹp khi tắt
    return () => { document.body.style.overflow = 'unset'; };
}, [isPrintModalOpen, isDocsModalOpen]);


        useEffect(() => {
    if (scrollRef.current) {
        const activeItem = scrollRef.current.childNodes[activeIndex];
        if (activeItem) {
            // Tự động cuộn đến mục đang chọn (block: 'nearest' để mượt hơn)
            activeItem.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }
    }
}, [activeIndex]); // Chạy lại mỗi khi activeIndex thay đổi

        // --- STATE QUẢN LÝ ---
        const [isLoading, setIsLoading] = useState(false);
        const [progress, setProgress] = useState(0);
        const [searchTerm, setSearchTerm] = useState('');

        // --- HÀM KIỂM TRA CẤP ĐỘ JLPT ---
const getJLPTLevel = (char) => {
    if (dbData.KANJI_LEVELS.N5.includes(char)) return 'N5';
    if (dbData.KANJI_LEVELS.N4.includes(char)) return 'N4';
    if (dbData.KANJI_LEVELS.N3.includes(char)) return 'N3';
    if (dbData.KANJI_LEVELS.N2.includes(char)) return 'N2';
    if (dbData.KANJI_LEVELS.N1.includes(char)) return 'N1';
    return null;
};

const levelColors = {
    N5: 'bg-green-100 text-green-700 border-green-200 hover:bg-green-600 hover:text-white hover:border-green-600',
    N4: 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-600 hover:text-white hover:border-blue-600',
    N3: 'bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-600 hover:text-white hover:border-orange-600',
    N2: 'bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-600 hover:text-white hover:border-purple-600',
    N1: 'bg-red-100 text-red-700 border-red-200 hover:bg-red-600 hover:text-white hover:border-red-600'
};

        
        // Menu Popup & Ref
        const [isUtilsOpen, setIsUtilsOpen] = useState(false);
        const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
        const filterRef = useRef(null);
        const quickMenuRef = useRef(null); // THÊM: Ref cho menu Chọn nhanh
        const utilsMenuRef = useRef(null); // THÊM: Ref cho menu Tiện ích
        const cafeModalRef = useRef(null);
        const searchInputRef = useRef(null); // Tạo "địa chỉ" cho ô nhập liệu
        const configMenuRef = useRef(null);
        // Biến kiểm soát bộ gõ IME (Quan trọng)
        const isComposing = useRef(false);

        const [randomCount, setRandomCount] = useState(10); 

        // State hiển thị nội bộ
        const [localText, setLocalText] = useState(config.text);

        // Tùy chọn bộ lọc
        const [filterOptions, setFilterOptions] = useState({
            hiragana: true,
            katakana: true,
            kanji: true,
            removeDuplicates: false 
        });

        // --- HÀM TẠO PLACEHOLDER ---
        const getDynamicPlaceholder = () => {
            const labels = [];
            if (filterOptions.kanji) labels.push("漢字");       
            if (filterOptions.hiragana) labels.push("ひらがな"); 
            if (filterOptions.katakana) labels.push("カタカナ"); 
            
            if (labels.length === 0) return "Vui lòng chọn ít nhất 1 loại chữ...";
            return labels.join(", ");
        };

        // --- 1. CLICK RA NGOÀI ĐỂ ĐÓNG MENU ---
       // --- XỬ LÝ CLICK RA NGOÀI ĐỂ ĐÓNG MENU ---
useEffect(() => {
    function handleClickOutside(event) {
        // 1. Xử lý Bộ lọc (Filter)
        if (filterRef.current && !filterRef.current.contains(event.target)) {
            setIsFilterMenuOpen(false);
        }

        // 2. Xử lý "Chọn nhanh" (Quick Select) - Tự đóng khi click ra ngoài
        if (isMenuOpen && quickMenuRef.current && !quickMenuRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }

        // 3. Xử lý "Tiện ích" (Utils) - Tự đóng khi click ra ngoài
        if (isUtilsOpen && utilsMenuRef.current && !utilsMenuRef.current.contains(event.target)) {
            setIsUtilsOpen(false);
        }
        if (isCafeModalOpen && cafeModalRef.current && !cafeModalRef.current.contains(event.target)) {
            setIsCafeModalOpen(false);
        }
        // 5. MỚI: Xử lý "Tùy chỉnh" - Tự đóng khi click ra ngoài
        if (isConfigOpen && configMenuRef.current && !configMenuRef.current.contains(event.target)) {
            setIsConfigOpen(false);
        }

    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
}, [isMenuOpen, isUtilsOpen, isFilterMenuOpen, isCafeModalOpen, isConfigOpen]); // Thêm dependencies để cập nhật trạng thái mới nhất

        // --- 2. ĐỒNG BỘ DỮ LIỆU TỪ NGOÀI ---
        useEffect(() => {
            const currentClean = localText ? localText.replace(/[a-zA-Z]/g, '') : '';
            if (currentClean !== config.text) {
                setLocalText(config.text);
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [config.text]);

        const handleChange = (key, value) => {
          onChange({ ...config, [key]: value });
        };

        const shuffleString = (str) => {
            const arr = [...str];
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr.join('');
        };

        // --- HÀM TRỢ GIÚP: REGEX ---
        const getAllowedRegexString = (options, allowLatin = false) => {
            let ranges = "\\s"; 
            if (allowLatin) ranges += "a-zA-Z"; // Latinh luôn được phép ở input

            if (options.hiragana) ranges += "\\u3040-\\u309F";
            if (options.katakana) ranges += "\\u30A0-\\u30FF";
            if (options.kanji)    ranges += "\\u4E00-\\u9FAF\\u3400-\\u4DBF\\u2E80-\\u2FDF\\uF900-\\uFAFF"; 
            return ranges;
        };
        // --- HÀM TRỢ GIÚP: XÓA TRÙNG LẶP ---
          const getUniqueChars = (str) => {
              return Array.from(new Set(str)).join('');
              };

        // --- 3. XỬ LÝ CHECKBOX ---
        const handleFilterChange = (key) => {
            const newOptions = { ...filterOptions, [key]: !filterOptions[key] };
            setFilterOptions(newOptions);
            
            let newText = localText;

            // Xử lý các ô Hiragana/Katakana/Kanji (như cũ)
            if (['hiragana', 'katakana', 'kanji'].includes(key) && filterOptions[key] === true) {
                const allowedString = getAllowedRegexString(newOptions, true); 
                const regex = new RegExp(`[^${allowedString}]`, 'g');
                newText = newText.replace(regex, '');
            }

            // Xử lý ô Xóa trùng lặp (MỚI)
            if (newOptions.removeDuplicates) {
                newText = getUniqueChars(newText);
            }
            
            setLocalText(newText);
            handleChange('text', newText.replace(/[a-zA-Z]/g, ''));
        };

// --- 4. NÚT XÓA LATINH + DỒN DÒNG (PHIÊN BẢN XÓA SẠCH SÀNH SANH) ---
        const handleRemoveLatinManual = () => {
            if (!localText) return;
            let cleaned = localText;
            
            // 1. Xóa chữ cái Latinh
            cleaned = cleaned.replace(/[a-zA-Z]/g, '');
            
            // 2. Xóa hết dấu xuống dòng (Enter) -> Thay bằng rỗng ''
            cleaned = cleaned.replace(/[\n\r]+/g, '');
            
            // 3. Xóa hết các loại dấu cách (thường, tab, Nhật) -> Thay bằng rỗng ''
            // Regex này bao gồm: dấu cách thường ( ), dấu cách Nhật (　), và tab (\t)
            cleaned = cleaned.replace(/[ 　\t]+/g, ''); 
            
            // Cắt khoảng trắng thừa 2 đầu (nếu còn sót)
            cleaned = cleaned.trim();

            setLocalText(cleaned);
            handleChange('text', cleaned); 
        };

        // --- 5. XỬ LÝ NHẬP LIỆU (ĐÃ FIX LỖI IME) ---
      // --- 5. XỬ LÝ NHẬP LIỆU (REAL-TIME FILTER) ---
        const handleInputText = (e) => {
            const rawInput = e.target.value;

            // Nếu đang lơ lửng gõ bộ gõ (IME) thì cứ để hiện
            if (isComposing.current) {
                setLocalText(rawInput);
                return;
            }
            
            // 1. Lọc ký tự rác (số, icon...)
            const allowedString = getAllowedRegexString(filterOptions, true);
            const blockRegex = new RegExp(`[^${allowedString}]`, 'g');
            let validForInput = rawInput.replace(blockRegex, '');

            // 2. LOGIC QUAN TRỌNG: Lọc trùng ngay lập tức
            if (filterOptions.removeDuplicates) {
                validForInput = getUniqueChars(validForInput);
            }

            setLocalText(validForInput);
            handleChange('text', validForInput.replace(/[a-zA-Z]/g, ''));
        };

        const handleCompositionStart = () => {
            isComposing.current = true;
        };

        const handleCompositionEnd = (e) => {
            isComposing.current = false;
            
            // Lấy toàn bộ nội dung trong ô nhập lúc này
            const rawInput = e.target.value;
            
            // 1. Lọc rác
            const allowedString = getAllowedRegexString(filterOptions, true);
            const blockRegex = new RegExp(`[^${allowedString}]`, 'g');
            let validForInput = rawInput.replace(blockRegex, '');

            // 2. LOGIC QUAN TRỌNG: Lọc trùng ngay khi chốt chữ
            if (filterOptions.removeDuplicates) {
                validForInput = getUniqueChars(validForInput);
            }

            setLocalText(validForInput);
            handleChange('text', validForInput.replace(/[a-zA-Z]/g, ''));
        };
// Thêm tham số type (mặc định là 'kanji')
const handleLoadFromGithub = async (url, type = 'kanji') => {
    setProgress(0);
    setIsLoading(true);     
    setIsMenuOpen(false);   
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Lỗi tải dữ liệu từ ${url}`);
        }

        const rawText = await response.text();
        const cleanText = rawText.replace(/["\n\r\s,\[\]]/g, '');

        if (!cleanText) {
             alert("File dữ liệu rỗng!");
             setIsLoading(false);
             return;
        }

      
        setFilterOptions(prev => ({ ...prev, [type]: true })); 
        
        setProgress(30);
        setTimeout(() => setProgress(100), 300);

        setTimeout(() => {
            setLocalText(cleanText);              
            onChange({ ...config, text: cleanText }); 
            setIsLoading(false);                  
        }, 500);

    } catch (error) {
        console.error("Lỗi:", error);
        alert("Không tải được dữ liệu. Vui lòng kiểm tra lại đường truyền hoặc link GitHub.");
        setIsLoading(false);
    }
};
        // --- HÀM MỚI: Lấy ngẫu nhiên Kanji từ GitHub ---
        const handleRandomLoadFromGithub = async (level) => {
            // 1. Kiểm tra số lượng
            if (randomCount === '' || randomCount <= 0) {
                alert("Vui lòng nhập số lượng chữ cần lấy!");
                return;
            }
            setProgress(0);

            // 2. Tạo link file: kanjin5.json...
            const fileName = `kanji${level.toLowerCase()}.json`; 
            const url = `https://raw.githubusercontent.com/datto02/luyenvietkanji/refs/heads/main/${fileName}`;

            setIsLoading(true);
            setIsUtilsOpen(false); // Đóng menu Tiện ích
            
            try {
                // 3. Tải file về
                const response = await fetch(url);
                if (!response.ok) throw new Error("Lỗi tải file");
                
                const rawText = await response.text();
                const cleanText = rawText.replace(/["\n\r\s]/g, '');

                if (!cleanText) {
                     alert("File dữ liệu rỗng!");
                     setIsLoading(false);
                     return;
                }

                // 4. Xáo trộn và cắt lấy số lượng cần thiết
                const shuffled = shuffleString(cleanText); // Hàm shuffleString có sẵn trong code cũ rồi
                let count = randomCount > 50 ? 50 : randomCount;
                const selectedChars = shuffled.slice(0, count);

                // 5. Hiển thị
                setFilterOptions(prev => ({ ...prev, kanji: true }));
                
                setProgress(30);
                setTimeout(() => setProgress(100), 300);

                setTimeout(() => {
                    setLocalText(selectedChars);
                    onChange({ ...config, text: selectedChars });
                    setIsLoading(false);
                }, 500);

            } catch (error) {
                console.error(error);
                alert(`Không tải được dữ liệu ${level}. Kiểm tra lại mạng hoặc link GitHub.`);
                setIsLoading(false);
            }
        };
window.Sidebar = Sidebar;
