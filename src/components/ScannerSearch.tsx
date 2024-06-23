import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ScannerSearch: React.FC = () => {
  const [inputData, setInputData] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedHistory = localStorage.getItem("searchHistory");
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
  };

  const handleButtonClick = () => {
    // 중복 제거 및 최신 검색 기록을 맨 앞으로 이동
    const updatedHistorySet = new Set([inputData, ...searchHistory]);
    const updatedHistory = Array.from(updatedHistorySet);
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    navigate(`/scan?query=${inputData}`);
  };

  const handleDelete = (index: number) => {
    const updatedHistory = searchHistory.filter((_, i) => i !== index);
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    // 작은 지연을 주어 클릭이 발생한 경우 삭제 버튼 클릭을 허용
    setTimeout(() => setIsInputFocused(false), 200);
  };

  const handleHistoryClick = (history: string) => {
    setInputData(history);
    navigate(`/scan?query=${history}`);
  };

  return (
    <div className="p-4">
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={inputData}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="검색어를 입력하세요"
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={handleButtonClick}
        >
          검색하기
        </button>
      </div>
      {isInputFocused && (
        <div className="relative mt-4">
          <h2 className="text-lg font-semibold mb-2">검색 기록</h2>
          <div className="relative">
            <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
              <ul className="list-none p-2">
                {searchHistory.map((history, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleHistoryClick(history)}
                  >
                    <span className="text-gray-700">{history}</span>
                    <button
                      className="text-red-500 hover:text-red-700 focus:outline-none"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(index);
                      }}
                    >
                      삭제
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScannerSearch;
