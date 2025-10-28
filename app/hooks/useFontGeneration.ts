import { useState, useCallback, useRef, useEffect } from "react";
import {
  startFontGeneration,
  checkFontGenerationStatus,
  downloadFont,
  FontGenerationRequest,
  FontGenerationResponse,
} from "../services/fontApi";

export interface UseFontGenerationReturn {
  isLoading: boolean;
  progress: number;
  message: string;
  error: string | null;
  downloadUrl: string | null;
  generateFont: (request: FontGenerationRequest) => Promise<void>;
  downloadGeneratedFont: () => Promise<void>;
  reset: () => void;
}

export const useFontGeneration = (): UseFontGenerationReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("대기 중…");
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [fontId, setFontId] = useState<string | null>(null);

  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // 상태 초기화
  const reset = useCallback(() => {
    setIsLoading(false);
    setProgress(0);
    setMessage("대기 중…");
    setError(null);
    setDownloadUrl(null);
    setFontId(null);

    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
  }, []);

  // 진행 상태 메시지 매핑
  const getProgressMessage = useCallback((progress: number): string => {
    if (progress < 20) return "프롬프트 분석 중";
    if (progress < 40) return "글리프 생성 중";
    if (progress < 60) return "커닝·힌팅 최적화";
    if (progress < 80) return "미리보기 렌더링";
    if (progress < 100) return "TTF 패키징 중";
    return "TTF 패키징 완료";
  }, []);

  // 상태 폴링
  const pollStatus = useCallback(
    async (id: string) => {
      try {
        const status = await checkFontGenerationStatus(id);

        setProgress(status.progress);
        setMessage(status.message || getProgressMessage(status.progress));

        // 커스텀 이벤트 발생 (기존 코드와의 호환성을 위해)
        window.dispatchEvent(
          new CustomEvent("font-progress", {
            detail: Math.round((status.progress / 100) * 1000),
          })
        );

        if (status.status === "completed") {
          setDownloadUrl(status.downloadUrl || null);
          setIsLoading(false);
          if (pollIntervalRef.current) {
            clearInterval(pollIntervalRef.current);
            pollIntervalRef.current = null;
          }
        } else if (status.status === "failed") {
          setError(status.error || "폰트 생성에 실패했습니다.");
          setIsLoading(false);
          if (pollIntervalRef.current) {
            clearInterval(pollIntervalRef.current);
            pollIntervalRef.current = null;
          }
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "상태 확인 중 오류가 발생했습니다."
        );
        setIsLoading(false);
        if (pollIntervalRef.current) {
          clearInterval(pollIntervalRef.current);
          pollIntervalRef.current = null;
        }
      }
    },
    [getProgressMessage]
  );

  // 폰트 생성 시작
  const generateFont = useCallback(
    async (request: FontGenerationRequest) => {
      try {
        setIsLoading(true);
        setError(null);
        setProgress(0);
        setMessage("프롬프트 분석 중");

        const response = await startFontGeneration(request);
        setFontId(response.id);

        // 상태 폴링 시작
        pollIntervalRef.current = setInterval(() => {
          pollStatus(response.id);
        }, 1000);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "폰트 생성 요청에 실패했습니다."
        );
        setIsLoading(false);
      }
    },
    [pollStatus]
  );

  // 폰트 다운로드
  const downloadGeneratedFont = useCallback(async () => {
    if (!fontId) {
      setError("다운로드할 폰트가 없습니다.");
      return;
    }

    try {
      const blob = await downloadFont(fontId);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `generated-font-${fontId}.ttf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "다운로드에 실패했습니다.");
    }
  }, [fontId]);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, []);

  return {
    isLoading,
    progress,
    message,
    error,
    downloadUrl,
    generateFont,
    downloadGeneratedFont,
    reset,
  };
};
