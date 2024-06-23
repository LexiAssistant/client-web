import React from "react";

interface SearchInputProps {
  inputData: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleButtonClick: () => void;
  handleInputFocus: () => void;
  handleInputBlur: () => void;
  openSignupModal: () => void;
  openDeviceModal: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  inputData,
  handleInputChange,
  handleButtonClick,
  handleInputFocus,
  handleInputBlur,
  openSignupModal,
  openDeviceModal,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4">
      <input
        type="text"
        value={inputData}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-10 flex-1 text-left cursor-pointer block text-xs leading-4 text-gray-900 font-bold mb-1 sm:mb-0"
        placeholder="검색어를 입력하세요"
        style={{
          fontFamily: "Apple SD Gothic Neo, 'Roboto', sans-serif, system-ui",
          backgroundColor: "var(--gray0)",
          fontSize: "14px",
          lineHeight: "20px",
        }}
      />
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 h-10 transition ease-in-out duration-150"
          onClick={handleButtonClick}
        >
          검색하기
        </button>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 h-10 transition ease-in-out duration-150"
          onClick={openSignupModal}
        >
          회원가입
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 h-10 transition ease-in-out duration-150"
          onClick={openDeviceModal}
        >
          기기 등록
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
