import React from "react";

interface SearchInputProps {
  inputData: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleButtonClick: () => void;
  handleInputFocus: () => void;
  handleInputBlur: () => void;
  openSignupModal: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  inputData,
  handleInputChange,
  handleButtonClick,
  handleInputFocus,
  handleInputBlur,
  openSignupModal,
}) => {
  return (
    <div className="flex items-center justify-between space-x-4">
      <input
        type="text"
        value={inputData}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-10 flex-1 text-left cursor-pointer block text-xs leading-4 text-gray-900 font-bold mb-1"
        placeholder="검색어를 입력하세요"
        style={{
          fontFamily:
            "Apple SD Gothic Neo, '__Roboto_5b92f9', '__Roboto_Fallback_5b92f9', sans-serif, system-ui, sans-serif",
          backgroundColor: "var(--gray0)",
          fontSize: "14px",
          lineHeight: "20px",
        }}
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 h-10"
        onClick={handleButtonClick}
      >
        검색하기
      </button>
      <button
        className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 h-10"
        onClick={openSignupModal}
      >
        회원가입
      </button>
    </div>
  );
};

export default SearchInput;
