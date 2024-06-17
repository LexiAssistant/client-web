import React, { useState } from "react";

const SearchComponent: React.FC = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);

  const handleSearch = async () => {
    const response = await fetch(`/api/search?query=${query}`);
    const data = await response.json();
    setResult(data.results);
  };
  return (
    <div className="search-component">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Epson 스캐너 또는 복합기를 검색하세요"
        className="input"
      />
      <button onClick={handleSearch} className="button">
        검색
      </button>
      <div className="results">
        {result.map((result) => (
          <div key={result.id} className="result-item">
            {result.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;
