const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// 정적 파일 제공
app.use("/images", express.static(path.join(__dirname, "images")));

let users = [
  { email: "user1@example.com", password: "password1" },
  { email: "user2@example.com", password: "password2" },
];
let tokens = [];
let scans = [
  {
    userEmail: "user1@example.com",
    target: "user1",
    image: "images/example_jpg.jpg",
    imageId: 1,
    scannerId: "1",
  },
  {
    userEmail: "user2@example.com",
    target: "user2",
    image: "images/example_jpg2.jpg",
    imageId: 2,
    scannerId: "2",
  },
];
let scanners = [
  { id: "1", name: "Scanner 1", status: "active", location: "Room 1" },
  { id: "2", name: "Scanner 2", status: "inactive", location: "Room 2" },
];

// 1. 로그인
app.post("/api/auth/signin", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    const token = `token-${email}`;
    tokens.push(token);
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// 2. 회원가입
app.post("/api/auth/signup", (req, res) => {
  const { email, password } = req.body;
  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ message: "User already exists" });
  }
  users.push({ email, password });
  res.status(201).json({ message: "User registered successfully" });
});

// 3. 토큰 리프레시
app.get("/api/auth/:userEmail/issue/token", (req, res) => {
  const { userEmail } = req.params;
  const token = `token-${userEmail}`;
  tokens.push(token);
  res.json({ token });
});

// 4. 앱손 액세스 토큰 발급
app.post("/api/auth/epson/:printerEmail/:userEmail", (req, res) => {
  const { printerEmail, userEmail } = req.params;
  const token = `epson-token-${printerEmail}-${userEmail}`;
  res.json({ token });
});

// 5. 스캔 대상 등록
app.post("/api/scan/regi/:userEmail", (req, res) => {
  const { userEmail } = req.params;
  const { target } = req.body;
  scans.push({ userEmail, target });
  res.json({ message: "Scan target registered successfully" });
});

// 6. 스캔 이미지 업로드
app.post("/api/scan/:userEmail", (req, res) => {
  const { userEmail } = req.params;
  const { image } = req.body;
  const imageId = scans.length + 1;
  scans.push({ userEmail, image, imageId });
  res.json({ message: "Image uploaded successfully", imageId });
});

// 7. 스캔 이미지 다운로드
app.get("/api/scan/download/:imageId", (req, res) => {
  const { imageId } = req.params;
  const scan = scans.find((s) => s.imageId == imageId);
  if (scan) {
    res.json({ image: scan.image });
  } else {
    res.status(404).json({ message: "Image not found" });
  }
});

// 8. 유저 스캔 이미지 URL 조회
app.get("/api/scan/download/user/:email", (req, res) => {
  const { email } = req.params;
  const userScans = scans.filter((s) => s.userEmail === email);
  const imageUrls = userScans.map(
    (scan) => `/api/scan/download/${scan.imageId}`
  );
  res.json({ imageUrls });
});

// 9. 스캐너 등록
app.post("/api/scanners", (req, res) => {
  const { name, pin, status, location } = req.body;
  const id = scanners.length + 1;
  const newScanner = { id: id.toString(), name, pin, status, location };
  scanners.push(newScanner);
  res
    .status(201)
    .json({ message: "Scanner registered successfully", scanner: newScanner });
});

// 10. 스캐너 상세 정보 조회
app.get("/api/scanners/:id", (req, res) => {
  const { id } = req.params;
  const scanner = scanners.find((s) => s.id === id);
  if (scanner) {
    const scannedImages = scans.filter((scan) => scan.scannerId === id);
    const images = scannedImages.map((scan) => ({
      imageId: scan.imageId,
      image: scan.image,
      target: scan.target,
    }));
    res.json({ ...scanner, scannedImages: images });
  } else {
    res.status(404).json({ message: "Scanner not found" });
  }
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
