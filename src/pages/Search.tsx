import React, { useState } from "react";
//import { uploadScanImage, searchScanImages } from "../services/api";
//import { ScanImage } from "../types";

const SearchPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  //const [searchResults, setSearchResults] = useState<ScanImage[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    try {
      //await uploadScanImage(file);
      alert("업로드 성공");
    } catch (error) {
      alert("업로드 실패");
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      //const results = await searchScanImages();
      //setSearchResults(results.data);
    } catch (error) {
      alert("검색 실패");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4">스캔 이미지 검색</h1>
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              이미지 업로드
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          <button
            type="button"
            onClick={handleUpload}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            업로드
          </button>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
          >
            검색
          </button>
        </form>
        {/* {searchResults.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">검색 결과</h2>
            <ul className="space-y-4">
              {searchResults.map((result) => (
                <li
                  key={result.id}
                  className="p-4 bg-gray-50 rounded-md shadow"
                >
                  <img
                    src={result.url}
                    alt="Scan"
                    className="w-full h-40 object-cover rounded-md mb-2"
                  />
                  <p className="text-sm text-gray-700">{result.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default SearchPage;
