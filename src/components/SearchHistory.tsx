import React from "react";

interface SearchHistoryProps {
  searchHistory: string[];
  handleHistoryClick: (history: string) => void;
  handleDelete: (index: number) => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({
  searchHistory,
  handleHistoryClick,
  handleDelete,
}) => {
  return (
    <div className="relative mt-4">
      <h2 className="text-lg font-semibold mb-2 text-left">검색 기록</h2>
      <ul className="absolute bg-white border border-gray-300 rounded-md shadow-lg w-full z-10">
        {searchHistory.map((history, index) => (
          <li
            key={index}
            className="p-2 cursor-pointer hover:bg-gray-100 flex justify-between items-center"
            onClick={() => handleHistoryClick(history)}
          >
            <span>{history}</span>
            <button
              className="ml-2 text-red-500 hover:text-red-700"
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
  );
};

export default SearchHistory;
