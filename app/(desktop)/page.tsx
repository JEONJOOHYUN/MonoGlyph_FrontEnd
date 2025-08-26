"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AiOutlineAppstore } from "react-icons/ai";
import { FiSettings, FiFileText, FiSearch } from "react-icons/fi";
import { IoArrowUpCircleOutline } from "react-icons/io5";

/** 서버 주소
 *  기본값: http://localhost:8000
 *  환경변수로 바꾸려면 NEXT_PUBLIC_API_URL 사용 (trailing slash 제거)
 */
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") || "http://localhost:8000";

/** SSE 이벤트 payload 타입 */
type ProgressEvt = { type: "progress"; code: number; message?: string };
type DoneEvt = {
  type: "done";
  code?: number;
  message?: string;
  download_url: string;
  filename?: string;
};
type ErrorEvt = {
  type: "error";
  message: string;
  returncode?: number;
  stderr_tail?: string;
};

export default function Main() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"home" | "loading">("home");
  const [query, setQuery] = useState("");

  // 진행/결과/오류 상태
  const [code, setCode] = useState<number>(0);
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isRequesting, setIsRequesting] = useState(false);

  // 참조들
  const inputRef = useRef<HTMLInputElement | null>(null);
  const esRef = useRef<EventSource | null>(null);

  /** 진행 단계 라벨 폴백 맵 (서버 메시지가 없을 때 사용) */
  const stepLabel = useMemo(
    () =>
      ({
        0: "대기 중…",
        200: "프롬프트 분석 및 생성중",
        400: "생성된 글자 분석중",
        600: "전체 글자 생성중",
        800: "폰트 파일 생성중",
        1000: "TTF 생성 완료",
      } as Record<number, string>),
    []
  );

  /** 퍼센트 계산 (코드 스냅샷 기준 구간 맵핑) */
  const pct = useMemo(() => {
    const keys = [0, 200, 400, 600, 800, 1000];
    const maxKey = 1000;
    const p = Math.max(0, Math.min(100, Math.round((code / maxKey) * 100)));
    // 0,200,400...로 점프하므로 선형으로 보여도 직관적임
    return p;
  }, [code]);

  /** 화면에 보여줄 현재 메시지 (서버 제공 > 폴백) */
  const message = serverMessage ?? stepLabel[code] ?? stepLabel[nearest([0, 200, 400, 600, 800, 1000], code)];

  /** SSE 연결 시작 */
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
    setServerMessage(null);
    setCode(0);
    setIsRequesting(true);

    // 이전 SSE 정리
    try {
      esRef.current?.close();
    } catch {}
    esRef.current = null;

    // SSE 연결
    const url = `${API_BASE}/run/stream?prompt=${encodeURIComponent(query)}`;
    // credentials가 필요한 경우(CORS allow_credentials=True) withCredentials 옵션 사용
    const es = new EventSource(url, { withCredentials: true });
    esRef.current = es;

    // 진행 이벤트
    es.addEventListener("progress", (evt) => {
      try {
        const data: ProgressEvt = JSON.parse((evt as MessageEvent).data);
        if (typeof data.code === "number") setCode((prev) => (data.code > prev ? data.code : prev));
        if (data.message) setServerMessage(data.message);
      } catch (e) {
        // JSON 파싱 실패는 무시
      }
    });

    // 완료 이벤트
    es.addEventListener("done", (evt) => {
      try {
        const data: DoneEvt = JSON.parse((evt as MessageEvent).data);
        setCode(data.code ?? 1000);
        if (data.message) setServerMessage(data.message);
        if (data.download_url) setDownloadUrl(data.download_url);
      } finally {
        setIsRequesting(false);
        es.close();
      }
    });

    // 오류 이벤트
    es.addEventListener("error", (evt) => {
      try {
        // 서버가 error 이벤트로 JSON을 보냄
        // 일부 브라우저는 재연결을 시도할 수 있으니 명시적으로 닫아줌
        const raw = (evt as MessageEvent).data as string | undefined;
        let parsed: ErrorEvt | null = null;
        if (raw) {
          try {
            parsed = JSON.parse(raw);
          } catch {}
        }
        setErrorMsg(parsed?.message || "Pipeline failed or connection error");
      } finally {
        setIsRequesting(false);
        es.close();
      }
    });
  }

  /** Enter 키로 시작 */
  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") beginLoading();
  }

  /** 뒤로가기: SSE 연결 정리 */
  function handleBack() {
    try {
      esRef.current?.close();
    } catch {}
    esRef.current = null;
    setIsRequesting(false);
    setMode("home");
    setCode(0);
    setServerMessage(null);
    setDownloadUrl(null);
    setErrorMsg(null);
  }

  /** 언마운트 시 SSE 정리 */
  useEffect(() => {
    return () => {
      try {
        esRef.current?.close();
      } catch {}
      esRef.current = null;
    };
  }, []);

  return (
    <div className={["min-h-screen bg-bg", "[--sw:22vw]"].join(" ")}>
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
          <div>✨ 모노 전용 폰트 </div>
        </div>

        <div className="absolute bottom-0 w-full p-4 flex flex-col items-center text-center font-paper">
          <img src="/images/문의.png" alt="문의하기" className="w-20 h-20 mb-2" />
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

      <main className={["transition-[padding] duration-300 ease-out", open ? "pl-[var(--sw)]" : "pl-0"].join(" ")}>
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
            isRequesting={isRequesting}
            errorMsg={errorMsg}
            message={message}
            pct={pct}
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
          "원하는 프롬프트로
          <br />
          폰트를 자유롭게 만들어보세요"
        </h1>

        <div
          className="
            mx-auto mt-[2vh] flex items-center justify-between
            h-[2.6vw] w-[33.85vw]
            bg-sub text-main rounded-xl px-[0.63vw] shadow-md
          "
        >
          <div className="flex items-center gap-[0.42vw]">
            <button onClick={() => setOpen((v) => !v)} aria-label="사이드바 토글">
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
            placeholder="예) '손글씨 같은 산세리프, 굵게'"
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
  isRequesting,
  errorMsg,
  message,
  pct,
  onDownload,
}: {
  onBack: () => void;
  downloadUrl: string | null;
  isRequesting: boolean;
  errorMsg: string | null;
  message: string;
  pct: number;
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
              <p className="text-red-400 text-[1.05vw] font-medium leading-tight">오류: {errorMsg}</p>
              <p className="text-text/60 text-[0.78vw] mt-1">서버 로그(server.py)와 CORS/SSE 설정을 확인하세요.</p>
            </>
          ) : (
            <>
              <p className="text-text text-[1.05vw] font-medium leading-tight">{message}</p>
              <p className="text-text/60 text-[0.78vw] mt-1">진행률 {pct}%</p>
            </>
          )}
        </div>

        {!errorMsg && (
          <div className="mt-4">
            <div className="w-full h-3 rounded-full track-gradient/40 bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-text/70 progress-shine"
                style={{ width: `${pct}%`, transition: "width 500ms ease" }}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={pct}
                role="progressbar"
              />
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={onBack}
            className="btn-hover-invert px-4 py-2 rounded-lg bg-bg text-text text-sm shadow transition-colors duration-500 ease-in-out "
          >
            돌아가기
          </button>

          {/* 링크가 도착하면 활성화 */}
          <button
            disabled={!downloadUrl || !!errorMsg || isRequesting}
            onClick={onDownload}
            className={[
              "btn-hover-invert px-4 py-2 rounded-lg text-sm shadow transition-colors duration-500 ease-in-out active:opacity-80",
              downloadUrl && !errorMsg && !isRequesting ? "bg-bg text-text" : "bg-bg/50 text-text/40 cursor-not-allowed",
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

function nearest(arr: number[], value: number) {
  return arr.reduce((prev, curr) => (Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev), arr[0] ?? 0);
}
