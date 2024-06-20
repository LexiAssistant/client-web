import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

interface ScannedImage {
  imageId: number;
  image: string;
  target?: string;
}

interface ScannerData {
  id: string;
  name: string;
  status: string;
  location: string;
  scannedImages: ScannedImage[];
}

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Modal: React.FC<{ imageSrc: string; onClose: () => void }> = ({
  imageSrc,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg max-w-lg mx-auto">
        <button
          onClick={onClose}
          className="mb-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          닫기
        </button>
        <img src={imageSrc} alt="Detailed view" className="w-full h-auto" />
      </div>
    </div>
  );
};

const ScannerDetail: React.FC = () => {
  const [scanner, setScanner] = useState<ScannerData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [expandedImages, setExpandedImages] = useState<number[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const query = useQuery();
  const id = query.get("query");

  useEffect(() => {
    const fetchScannerDetail = async () => {
      try {
        if (!id) {
          throw new Error("ID가 존재하지 않습니다.");
        }

        const response = await axios.get(
          `http://localhost:3000/api/scanners/${id}`
        );
        setScanner(response.data);
      } catch (err) {
        console.error(err);
        setError("스캐너 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchScannerDetail();
  }, [id]);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const toggleImageDetails = (imageId: number) => {
    setExpandedImages((prev) =>
      prev.includes(imageId)
        ? prev.filter((id) => id !== imageId)
        : [...prev, imageId]
    );
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!scanner) {
    return <div>스캐너 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="scanner-detail">
      <h2 className="text-xl font-bold mb-2">{scanner.name}</h2>
      <p>
        <strong>ID:</strong> {scanner.id}
      </p>
      <button
        onClick={toggleDetails}
        className="mt-2 mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {showDetails ? "간략히 보기" : "상세 정보 보기"}
      </button>

      {showDetails && (
        <>
          <p>
            <strong>상태:</strong> {scanner.status}
          </p>
          <p>
            <strong>위치:</strong> {scanner.location}
          </p>
        </>
      )}

      <div className="scanned-images">
        <h3 className="text-lg font-semibold mt-4">스캔된 이미지 목록:</h3>
        {scanner.scannedImages.length > 0 ? (
          <ul>
            {scanner.scannedImages.map((image) => (
              <li key={image.imageId} className="mb-2">
                <div>
                  <img
                    src={`http://localhost:3000/${image.image}`}
                    alt={`Scanned ${image.imageId}`}
                    style={{ width: "200px", height: "auto" }}
                    onClick={() =>
                      setSelectedImage(`http://localhost:3000/${image.image}`)
                    }
                    className="cursor-pointer"
                  />
                  <button
                    onClick={() => toggleImageDetails(image.imageId)}
                    className="ml-2 px-2 py-1 bg-gray-300 rounded"
                  >
                    {expandedImages.includes(image.imageId)
                      ? "간략히 보기"
                      : "상세 정보 보기"}
                  </button>
                </div>

                {expandedImages.includes(image.imageId) && (
                  <div className="mt-2">
                    <p>
                      <strong>이미지 ID:</strong> {image.imageId}
                    </p>
                    {image.target && (
                      <p>
                        <strong>대상:</strong> {image.target}
                      </p>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>스캔된 이미지가 없습니다.</p>
        )}
      </div>

      {selectedImage && (
        <Modal
          imageSrc={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default ScannerDetail;
