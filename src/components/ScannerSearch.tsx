import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ScannerSearch: React.FC = () => {
  const [inputData, setInputData] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
  };

  const handleButtonClick = () => {
    navigate(`/scan?query=${inputData}`);
  };

  return (
    <div>
      <input type="text" value={inputData} onChange={handleInputChange} />
      <button className="bg-blue-300" onClick={handleButtonClick}>
        검색하기
      </button>
    </div>
  );
};

export default ScannerSearch;
