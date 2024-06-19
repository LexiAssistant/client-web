import React from "react";
import { useParams } from "react-router-dom";
import ScannerDetail from "../components/ScannerDetail";

const ScannerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">스캐너 상세 페이지</h1>
      <ScannerDetail />
    </div>
  );
};

export default ScannerDetailPage;
