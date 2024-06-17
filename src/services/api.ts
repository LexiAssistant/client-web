import axios from "axios";
import { ScanImage } from "../types/index";

const API_BASE_URL = "/api";

export const login = (email: string, password: string) =>
  axios.post(`${API_BASE_URL}/auth/signin`, { email, password });
export const signup = (email: string, password: string) =>
  axios.post(`${API_BASE_URL}/auth/signup`, { email, password });
export const refreshToken = (userEmail: string) =>
  axios.get(`${API_BASE_URL}/auth/${userEmail}/issue/token`);
export const issueEpsonToken = (printerEmail: string, userEmail: string) =>
  axios.post(`${API_BASE_URL}/auth/epson/${printerEmail}/${userEmail}`);
export const registerScanTarget = (userEmail: string, scanTarget: string) =>
  axios.post(`${API_BASE_URL}/scan/regi/${userEmail}`, { scanTarget });
export const uploadScanImage = (userEmail: string, image: File) => {
  const formData = new FormData();
  formData.append("image", image);
  return axios.post(`${API_BASE_URL}/scan/${userEmail}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const downloadScanImage = (imageId: string) =>
  axios.get<ScanImage>(`${API_BASE_URL}/scan/download/${imageId}`);
export const getUserScanImages = (email: string) =>
  axios.get<{ urls: string[] }>(`${API_BASE_URL}/scan/download/user/${email}`);
