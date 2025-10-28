import axios from "axios";

// API 기본 설정
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "/api",
  timeout: 30000, // 30초 타임아웃
  headers: {
    "Content-Type": "application/json",
  },
});

// 폰트 생성 요청 타입
export interface FontGenerationRequest {
  prompt: string;
  style?: string;
  weight?: string;
  options?: {
    format?: "ttf" | "otf" | "woff2";
    size?: "small" | "medium" | "large";
  };
}

// 폰트 생성 응답 타입
export interface FontGenerationResponse {
  id: string;
  status: "pending" | "processing" | "completed" | "failed";
  progress: number;
  message: string;
  downloadUrl?: string;
  error?: string;
}

// 폰트 생성 시작
export const startFontGeneration = async (
  request: FontGenerationRequest
): Promise<FontGenerationResponse> => {
  try {
    const response = await api.post<FontGenerationResponse>(
      "/font/generate",
      request
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "폰트 생성 요청에 실패했습니다."
      );
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};

// 폰트 생성 상태 확인
export const checkFontGenerationStatus = async (
  id: string
): Promise<FontGenerationResponse> => {
  try {
    const response = await api.get<FontGenerationResponse>(
      `/font/status/${id}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "상태 확인에 실패했습니다."
      );
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};

// 폰트 다운로드
export const downloadFont = async (id: string): Promise<Blob> => {
  try {
    const response = await api.get(`/font/download/${id}`, {
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("폰트 다운로드에 실패했습니다.");
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};

// 폰트 미리보기 이미지 가져오기
export const getFontPreview = async (
  id: string,
  text: string = "Sample Text"
): Promise<string> => {
  try {
    const response = await api.get(`/font/preview/${id}`, {
      params: { text },
      responseType: "blob",
    });
    return URL.createObjectURL(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("미리보기 생성에 실패했습니다.");
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};

export default api;
