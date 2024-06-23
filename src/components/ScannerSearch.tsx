import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DeviceModal from "./DeviceModal";
import SignupModal from "./SignUpModal";
import SearchInput from "./SearchInput";
import SearchHistory from "./SearchHistory";

const ScannerSearch: React.FC = () => {
  const [inputData, setInputData] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isDeviceModalOpen, setIsDeviceModalOpen] = useState(false);
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
    setTimeout(() => setIsInputFocused(false), 200);
  };

  const handleHistoryClick = (history: string) => {
    setInputData(history);
    navigate(`/scan?query=${history}`);
  };

  const openSignupModal = () => {
    setIsSignupModalOpen(true);
  };

  const closeSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  const openDeviceModal = () => {
    setIsDeviceModalOpen(true);
  };

  const closeDeviceModal = () => {
    setIsDeviceModalOpen(false);
  };

  return (
    <div
      className="p-4 relative bg-gray-50 rounded-2xl h-auto shadow-md"
      style={{
        fontFamily:
          "Apple SD Gothic Neo, '__Roboto_5b92f9', '__Roboto_Fallback_5b92f9', sans-serif, system-ui, sans-serif",
        boxShadow: "0 2px 2px 0 rgba(0,0,0,0.19)",
      }}
    >
      <SearchInput
        inputData={inputData}
        handleInputChange={handleInputChange}
        handleButtonClick={handleButtonClick}
        handleInputFocus={handleInputFocus}
        handleInputBlur={handleInputBlur}
        openSignupModal={openSignupModal}
        openDeviceModal={openDeviceModal}
      />
      {isInputFocused && (
        <SearchHistory
          searchHistory={searchHistory}
          handleHistoryClick={handleHistoryClick}
          handleDelete={handleDelete}
        />
      )}
      {isSignupModalOpen && (
        <SignupModal onClose={closeSignupModal} isOpen={isSignupModalOpen} />
      )}
      {isDeviceModalOpen && (
        <DeviceModal onClose={closeDeviceModal} isOpen={isDeviceModalOpen} />
      )}
    </div>
  );
};

export default ScannerSearch;
