import React, { useState } from "react";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const response = await fetch(`https://epson.n-e.kr/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      alert("회원가입 성공!");
      onClose();
    } else {
      alert("회원가입 실패. 다시 시도해 주세요.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4 md:mx-0">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6">회원가입</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{ transition: "all 0.2s ease-in-out" }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{ transition: "all 0.2s ease-in-out" }}
        />
        <button
          onClick={handleSignup}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{ transition: "background-color 0.2s ease-in-out" }}
        >
          회원가입
        </button>
        <button
          onClick={onClose}
          className="w-full mt-4 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
          style={{ transition: "background-color 0.2s ease-in-out" }}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default SignupModal;
