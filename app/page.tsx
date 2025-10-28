"use client";

import { useEffect, useRef, useState } from "react";
import { generateFont, getDownloadUrl } from "./api/MonoGlyphAPI";
import Sidebar from "./components/Sidebar";
import HomeView from "./components/HomeView";
import LoadingView from "./components/LoadingView";
import InquiryModal from "./components/InquiryModal";

export default function Main() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"home" | "loading">("home");
  const [query, setQuery] = useState("");
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  // 진행/결과/오류 상태
  const [progress, setProgress] = useState<number>(0);
  const [message, setMessage] = useState<string>("대기 중...");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // 참조
  const inputRef = useRef<HTMLInputElement | null>(null);
  const esRef = useRef<EventSource | null>(null);

  /** 폰트 생성 시작 */
  function beginLoading() {
    if (mode === "loading") return;
    if (!query.trim()) {
      inputRef.current?.focus();
      return;
    }

    // 초기화
    setMode("loading");
    setErrorMsg(null);
    setDownloadUrl(null);
    setProgress(0);
    setMessage("작업 시작 중...");

    // 이전 연결 정리
    try {
      esRef.current?.close();
    } catch {}
    esRef.current = null;

    // 폰트 생성 요청
    const es = generateFont(
      query,
      // 진행 이벤트
      (event) => {
        setProgress(event.progress);
        setMessage(event.message);
      },
      // 완료 이벤트
      (event) => {
        setProgress(100);
        setMessage(event.message);
        const url = getDownloadUrl(event.work_dir, event.filename);
        setDownloadUrl(url);
      },
      // 오류 이벤트
      (event) => {
        setErrorMsg(event.error);
        setMessage("오류 발생");
      }
    );

    esRef.current = es;
  }

  /** Enter 키로 시작 */
  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") beginLoading();
  }

  /** 뒤로가기 */
  function handleBack() {
    try {
      esRef.current?.close();
    } catch {}
    esRef.current = null;
    setMode("home");
    setQuery("");
    setProgress(0);
    setMessage("대기 중...");
    setDownloadUrl(null);
    setErrorMsg(null);
  }

  /** 언마운트 시 정리 */
  useEffect(() => {
    return () => {
      try {
        esRef.current?.close();
      } catch {}
      esRef.current = null;
    };
  }, []);

  return (
    <div className="min-h-screen bg-bg">
      <Sidebar
        open={open}
        onClose={() => setOpen(false)}
        onInquiryClick={() => setInquiryModalOpen(true)}
      />

      <main>
        {mode === "home" ? (
          <HomeView
            open={open}
            setOpen={setOpen}
            inputRef={inputRef}
            query={query}
            setQuery={setQuery}
            onKeyDown={onKeyDown}
            onStart={beginLoading}
          />
        ) : (
          <LoadingView
            onBack={handleBack}
            downloadUrl={downloadUrl}
            errorMsg={errorMsg}
            message={message}
            progress={progress}
            onDownload={() => {
              if (downloadUrl) window.open(downloadUrl, "_blank");
            }}
          />
        )}
      </main>

      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
      />
    </div>
  );
}
