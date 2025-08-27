"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AiOutlineAppstore } from "react-icons/ai"; // 사이드바
import { FiFileText, FiSearch } from "react-icons/fi"; // "대기 중…"
import { IoArrowUpCircleOutline } from "react-icons/io5"; // 업로드
import { MdOutlineStyle, MdFontDownload } from "react-icons/md"; // "스타일 분석 및 생성중", "TTF 파일 생성완료!"
import { RiAdminLine, RiFontSize } from "react-icons/ri"; // 관리자, "생성된 글자 분석중"
import { BiFontFamily } from "react-icons/bi"; // "전체 글자 생성중"
import { BsFileEarmarkFont } from "react-icons/bs"; // "폰트 파일 생성중"

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
    <div
      className={["min-h-screen bg-bg", "[--sw:clamp(260px,20vw,360px)]"].join(
        " "
      )}
    >
      <aside
        aria-hidden={!open}
        className={[
          "fixed inset-y-0 left-0 z-40 bg-sub shadow-2xl",
          "w-[var(--sw)] transform transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="flex py-[3vh] pl-[1vw]">
          <div className="flex flex-col px-[0.2vw] font-italia border-l-2 leading-none">
            <span className="text-[clamp(18px,1.6vw,28px)]">MonoGlyph</span>
            <span className="text-[clamp(12px,0.95vw,18px)]">
              Intelligence in Every Stroke
            </span>
          </div>
        </div>

        <div className="pt-5 flex flex-col pl-[1vw] font-paper text-[clamp(14px,1.1vw,18px)]">
          <div>📙 사용방법 </div>
        </div>

        <div
          className="absolute bottom-0 inset-x-0
                p-[clamp(12px,1.2vw,20px)]
                flex flex-col items-center text-center font-paper"
        >
          <img
            src="/images/문의.png"
            alt="문의하기"
            className="w-[clamp(56px,5.8vw,88px)]
               h-[clamp(56px,5.8vw,88px)]
               mb-[clamp(6px,0.6vw,10px)]"
          />

          <p
            className="text-[clamp(12px,0.95vw,16px)]
                leading-[1.35]
                mb-[clamp(8px,0.8vw,14px)]"
          >
            버그가 발생하거나 이용 중 불편하신 사항을
            <br />
            자유롭게 남겨주시면 감사하겠습니다.
          </p>

          <button
            className="btn-hover-invert w-full
               px-[clamp(12px,1vw,16px)]
               py-[clamp(8px,0.8vw,12px)]
               min-h-[clamp(36px,2.6vw,44px)]
               rounded-[clamp(8px,0.8vw,12px)]
               bg-bg text-[clamp(12px,0.95vw,16px)]
               shadow transition-colors duration-500 ease-in-out"
          >
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
    <div className="w-full max-w-[min(1100px,58vw)] min-h-screen mx-auto px-[clamp(20px,3vw,48px)] grid place-items-center">
      <div className="w-full">
        <h1 className="text-center font-paper leading-tight text-[clamp(22px,2.2vw,40px)]">
          "원하는 프롬프트로
          <br />
          폰트를 자유롭게 만들어보세요"
        </h1>

        <div
          className="mx-auto mt-[2vh] flex items-center justify-between bg-sub text-main rounded-xl shadow-md px-[clamp(10px,0.8vw,16px)]
                     h-[clamp(48px,2.8vw,64px)] w-[clamp(480px,36vw,820px)]"
        >
          <div className="flex items-center gap-[clamp(6px,0.5vw,10px)]">
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="사이드바 토글"
            >
              <AiOutlineAppstore
                className={[
                  "cursor-pointer hover:text-accent transition-colors duration-500 ease-in-out",
                  "text-[clamp(18px,1.45vw,28px)]",
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
            className="flex-1 mx-[clamp(10px,0.9vw,18px)] text-[clamp(13px,0.9vw,16px)] font-paper outline-none bg-transparent placeholder:text-text/40 text-text"
          />

          <div className="flex items-center gap-[clamp(6px,0.5vw,10px)]">
            <button aria-label="생성 시작" onClick={onStart}>
              <IoArrowUpCircleOutline className="cursor-pointer hover:text-accent transition-colors duration-500 ease-in-out text-[clamp(20px,1.6vw,30px)]" />
            </button>
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
      200: "스타일 분석 및 생성중",
      400: "생성된 글자 분석중",
      600: "전체 글자 생성중",
      800: "폰트 파일 생성중",
      1000: "TTF 파일 생성완료!",
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
      <div className="w-full max-w-[min(900px,42vw)] px-[clamp(16px,2vw,28px)] py-[clamp(16px,2.4vh,28px)] rounded-2xl bg-sub/70 shadow-xl backdrop-blur font-paper">
        <div className="relative h-[clamp(160px,18vh,220px)] grid place-items-center">
          <div className="absolute animate-bob">
            <FiFileText className="text-[clamp(54px,4.8vw,78px)]/90" />
          </div>
          <div className="absolute animate-orbit">
            <FiSearch className="text-[clamp(32px,3vw,46px)]/70" />
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-[clamp(14px,1.05vw,18px)] font-medium leading-tight">
            {message}
          </p>
          <p className="text-text/60 text-[clamp(12px,0.9vw,16px)] mt-1">
            진행률 {pct}%
          </p>
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
            className="btn-hover-invert px-4 py-2 rounded-lg bg-bg text-sm shadow transition-colors duration-500 ease-in-out "
          >
            돌아가기
          </button>
          {code >= 1000 && (
            <button className="btn-hover-invert px-4 py-2 rounded-lg bg-bg text-sm shadow transition-colors duration-500 ease-in-out active:opacity-80">
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
