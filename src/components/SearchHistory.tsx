import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../presenters/SearchHistory.css";

interface SearchHistoryProps {
  searchHistory: string[];
  handleHistoryClick: (history: string) => void;
  handleDelete: (index: number) => void;
  isInputFocused: boolean;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({
  searchHistory,
  handleHistoryClick,
  handleDelete,
  isInputFocused,
}) => {
  return (
    <CSSTransition
      in={isInputFocused}
      timeout={300}
      classNames="history-container"
      unmountOnExit
    >
      <div className="relative mt-4 mx-2 sm:mx-4 md:mx-6 lg:mx-8">
        <h2 className="text-lg font-semibold mb-2 text-left">검색 기록</h2>
        <ul className="relative bg-white border border-gray-200 rounded-md shadow-md w-full max-w-md">
          <TransitionGroup>
            {searchHistory.map((history, index) => (
              <CSSTransition
                key={index}
                timeout={300}
                classNames="history-item"
              >
                <li
                  className="p-2 cursor-pointer hover:bg-gray-100 flex justify-between items-center"
                  onClick={() => handleHistoryClick(history)}
                >
                  <span className="truncate">{history}</span>
                  <button
                    className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(index);
                    }}
                  >
                    삭제
                  </button>
                </li>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ul>
      </div>
    </CSSTransition>
  );
};

export default SearchHistory;
