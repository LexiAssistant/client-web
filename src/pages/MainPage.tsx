import React, { useState } from "react";
import ScannerSearch from "../components/ScannerSearch";

const MainPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">메인 페이지</h1>
      <ScannerSearch />
    </div>
  );
};

export default MainPage;
