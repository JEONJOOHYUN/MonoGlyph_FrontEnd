import { AiOutlineAppstore } from "react-icons/ai";
import { IoArrowUpCircleOutline } from "react-icons/io5";

interface HomeViewProps {
  open: boolean;
  setOpen: (v: boolean | ((p: boolean) => boolean)) => void;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  query: string;
  setQuery: (v: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onStart: () => void;
}

export default function HomeView({
  open,
  setOpen,
  inputRef,
  query,
  setQuery,
  onKeyDown,
  onStart,
}: HomeViewProps) {
  return (
    <div className="w-full max-w-2xl lg:max-w-3xl xl:max-w-4xl min-h-screen mx-auto px-6 md:px-8 lg:px-12 grid place-items-center">
      <div className="w-full">
        <h1 className="text-center font-paper leading-tight text-2xl md:text-3xl lg:text-4xl text-text">
          "원하는 스타일의
          <br />
          폰트를 자유롭게 만들어보세요"
        </h1>

        <div className="mx-auto mt-6 flex items-center justify-between h-12 md:h-14 lg:h-16 max-w-xl lg:max-w-2xl bg-sub text-main rounded-xl px-3 md:px-4 shadow-md">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="사이드바 토글"
            >
              <AiOutlineAppstore
                className={[
                  "text-2xl md:text-3xl cursor-pointer hover:text-accent transition-colors duration-500 ease-in-out",
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
            className="flex-1 mx-3 md:mx-4 text-sm md:text-base font-paper text-text outline-none bg-transparent placeholder:text-text/40"
          />

          <button aria-label="생성 시작" onClick={onStart}>
            <IoArrowUpCircleOutline className="text-2xl md:text-3xl cursor-pointer hover:text-accent transition-colors duration-500 ease-in-out" />
          </button>
        </div>
      </div>
    </div>
  );
}
