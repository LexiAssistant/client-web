import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ScannerDetailPage from "./pages/ScannerDetailPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/scan" element={<ScannerDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
