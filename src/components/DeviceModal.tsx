import React, { useState } from "react";

interface DeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignupModal: React.FC<DeviceModalProps> = ({ isOpen, onClose }) => {
  const [userEmail, setUserEmail] = useState("");
  const [printerEmail, setPrinterEmail] = useState("");

  const handleSignup = async () => {
    const response = await fetch(
      `https://epson.n-e.kr/api/auth/epson/${printerEmail}/${userEmail}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ printerEmail, userEmail }),
      }
    );

    if (response.ok) {
      alert("기기 등록 성공!");
      onClose();
    } else {
      alert("기기 등록 실패. 다시 확인해 주세요.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">기기 등록</h2>
        <input
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder="이메일"
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <input
          type="text"
          value={printerEmail}
          onChange={(e) => setPrinterEmail(e.target.value)}
          placeholder="프린트 번호"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          onClick={handleSignup}
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          기기 등록
        </button>
        <button
          onClick={onClose}
          className="w-full mt-2 py-2 rounded border border-gray-300"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default SignupModal;
