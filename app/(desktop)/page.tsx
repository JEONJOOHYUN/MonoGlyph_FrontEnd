"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AiOutlineAppstore } from "react-icons/ai";
import { FiSettings, FiFileText, FiSearch } from "react-icons/fi";
import { IoArrowUpCircleOutline } from "react-icons/io5";

export default function Main() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"home" | "loading">("home");
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  function beginLoading() {
    if (mode === "loading") return;
    setMode("loading");
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      beginLoading();
    }
  }

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
          <LoadingView onBack={() => setMode("home")} />
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

function LoadingView({ onBack }: { onBack: () => void }) {
  const [code, setCode] = useState<number>(0);

  const { message, pct } = useMemo(() => {
    const map: Record<number, string> = {
      0: "대기 중…",
      200: "프롬프트 분석 중",
      400: "글리프 생성 중",
      600: "커닝·힌팅 최적화",
      800: "미리보기 렌더링",
      1000: "TTF 패키징 완료",
    };
    const keys = Object.keys(map)
      .map(Number)
      .sort((a, b) => a - b);
    const label = map[code] ?? map[nearest(keys, code)];
    const maxKey = Math.max(...keys);
    const normalized = Math.max(
      0,
      Math.min(100, Math.round((code / maxKey) * 100))
    );
    return { message: label, pct: normalized };
  }, [code]);

  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<number>;
      if (typeof custom.detail === "number") setCode(custom.detail);
    };
    window.addEventListener("font-progress", handler as EventListener);
    return () =>
      window.removeEventListener("font-progress", handler as EventListener);
  }, []);

  useEffect(() => {
    let mounted = true;
    const milestones = [200, 400, 600, 800, 1000];
    let i = 0;
    const t = setInterval(() => {
      if (!mounted) return;
      setCode((prev) => (prev >= 1000 ? prev : milestones[i++] ?? 1000));
    }, 1200);
    return () => {
      mounted = false;
      clearInterval(t);
    };
  }, []);

  useEffect(() => {
    if (code >= 1000) {
      const tm = setTimeout(() => {}, 800);
      return () => clearTimeout(tm);
    }
  }, [code]);

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
          <p className="text-text text-[1.05vw] font-medium leading-tight">
            {message}
          </p>
          <p className="text-text/60 text-[0.78vw] mt-1">진행률 {pct}%</p>
        </div>

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

        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={onBack}
            className="btn-hover-invert px-4 py-2 rounded-lg bg-bg text-text text-sm shadow transition-colors duration-500 ease-in-out "
          >
            돌아가기
          </button>
          {code >= 1000 && (
            <button className="btn-hover-invert px-4 py-2 rounded-lg bg-bg text-text text-sm shadow transition-colors duration-500 ease-in-out active:opacity-80">
              TTF 다운로드
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function nearest(arr: number[], value: number) {
  return arr.reduce(
    (prev, curr) =>
      Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev,
    arr[0] ?? 0
  );
}
