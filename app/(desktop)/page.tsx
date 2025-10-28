"use client";

import { useEffect, useRef, useState } from "react";
import { AiOutlineAppstore } from "react-icons/ai";
import { FiSettings, FiFileText, FiSearch } from "react-icons/fi";
import { IoArrowUpCircleOutline } from "react-icons/io5";
import { generateFont, getDownloadUrl } from "./api/MonoGlyphAPI";

export default function Main() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"home" | "loading">("home");
  const [query, setQuery] = useState("");

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
    <div className="min-h-screen bg-bg [--sw:22vw]">
      <aside
        aria-hidden={!open}
        className={[
          "fixed inset-y-0 left-0 z-40 bg-sub shadow-2xl",
          "w-[var(--sw)] transform transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="flex py-[3vh] pl-[1vw]">
          <div className="flex flex-col px-[0.2vw] font-italia text-text border-l-2 leading-none">
            <span className="text-[1.82vw]">MonoGlyph</span>
            <span className="text-[1.04vw]">Intelligence in Every Stroke</span>
          </div>
        </div>

        <div className="pt-5 flex flex-col pl-[1vw] font-paper text-[1.4vw]">
          <div> </div>
        </div>

        <div className="absolute bottom-0 w-full p-4 flex flex-col items-center text-center font-paper">
          <img
            src="/images/문의.png"
            alt="문의하기"
            className="w-20 h-20 mb-2"
          />
          <p className="text-sm text-text mb-3">
            버그가 발생하거나 이용 중 불편하신 사항을
            <br />
            자유롭게 남겨주시면 감사하겠습니다.
          </p>
          <button className="btn-hover-invert w-full px-6 py-2 rounded-lg bg-bg text-text text-sm shadow transition-colors duration-500 ease-in-out">
            문의하기
          </button>
        </div>
      </aside>

      <main
        className={[
          "transition-[padding] duration-300 ease-out",
          open ? "pl-[var(--sw)]" : "pl-0",
        ].join(" ")}
      >
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
    </div>
  );
}

function HomeView({
  open,
  setOpen,
  inputRef,
  query,
  setQuery,
  onKeyDown,
  onStart,
}: {
  open: boolean;
  setOpen: (v: boolean | ((p: boolean) => boolean)) => void;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  query: string;
  setQuery: (v: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onStart: () => void;
}) {
  return (
    <div className="w-full max-w-[50vw] min-h-screen mx-auto px-[3vw] grid place-items-center">
      <div className="w-full">
        <h1 className="text-center font-paper leading-tight text-[2.34vw] text-text">
          "원하는 스타일의
          <br />
          폰트를 자유롭게 만들어보세요"
        </h1>

        <div className="mx-auto mt-[2vh] flex items-center justify-between h-[2.6vw] w-[33.85vw] bg-sub text-main rounded-xl px-[0.63vw] shadow-md">
          <div className="flex items-center gap-[0.42vw]">
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="사이드바 토글"
            >
              <AiOutlineAppstore
                className={[
                  "text-[1.56vw] cursor-pointer hover:text-accent transition-colors duration-500 ease-in-out",
                  open && "text-accent",
                ].join(" ")}
              />
            </button>
          </div>

          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="예) '굵게, 얇게, 고딕, 명조 등과 같이'"
            type="text"
            className="flex-1 mx-[0.83vw] text-[0.78vw] font-paper text-text outline-none bg-transparent placeholder:text-text/40"
          />

          <div className="flex items-center gap-[0.42vw]">
            <button aria-label="생성 시작" onClick={onStart}>
              <IoArrowUpCircleOutline className="text-[1.56vw] cursor-pointer hover:text-accent transition-colors duration-500 ease-in-out" />
            </button>
            <FiSettings className="text-[1.3vw] cursor-pointer hover:text-accent transition-colors duration-500 ease-in-out" />
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingView({
  onBack,
  downloadUrl,
  errorMsg,
  message,
  progress,
  onDownload,
}: {
  onBack: () => void;
  downloadUrl: string | null;
  errorMsg: string | null;
  message: string;
  progress: number;
  onDownload: () => void;
}) {
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="w-full max-w-[40vw] px-[2vw] py-[2.6vh] rounded-2xl bg-sub/70 shadow-xl backdrop-blur font-paper">
        <div className="relative h-[200px] grid place-items-center">
          <div className="absolute animate-bob">
            <FiFileText className="text-[78px] text-text/90" />
          </div>
          <div className="absolute animate-orbit">
            <FiSearch className="text-[46px] text-text/70" />
          </div>
        </div>

        <div className="mt-4 text-center">
          {errorMsg ? (
            <>
              <p className="text-red-400 text-[1.05vw] font-medium leading-tight">
                오류: {errorMsg}
              </p>
              <p className="text-text/60 text-[0.78vw] mt-1">
                서버 로그를 확인하세요.
              </p>
            </>
          ) : (
            <>
              <p className="text-text text-[1.05vw] font-medium leading-tight">
                {message}
              </p>
              <p className="text-text/60 text-[0.78vw] mt-1">
                진행률 {progress}%
              </p>
            </>
          )}
        </div>

        {!errorMsg && (
          <div className="mt-4">
            <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-text/70 transition-all duration-500"
                style={{ width: `${progress}%` }}
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
              />
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={onBack}
            className="btn-hover-invert px-4 py-2 rounded-lg bg-bg text-text text-sm shadow transition-colors duration-500 ease-in-out"
          >
            돌아가기
          </button>

          <button
            disabled={!downloadUrl || !!errorMsg}
            onClick={onDownload}
            className={[
              "btn-hover-invert px-4 py-2 rounded-lg text-sm shadow transition-colors duration-500 ease-in-out",
              downloadUrl && !errorMsg
                ? "bg-bg text-text"
                : "bg-bg/50 text-text/40 cursor-not-allowed",
            ].join(" ")}
            title={downloadUrl ? "생성된 TTF 다운로드" : "생성 중..."}
          >
            TTF 다운로드
          </button>
        </div>
      </div>
    </div>
  );
}
