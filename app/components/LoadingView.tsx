import { FiFileText, FiSearch } from "react-icons/fi";

interface LoadingViewProps {
  onBack: () => void;
  downloadUrl: string | null;
  errorMsg: string | null;
  message: string;
  progress: number;
  onDownload: () => void;
}

export default function LoadingView({
  onBack,
  downloadUrl,
  errorMsg,
  message,
  progress,
  onDownload,
}: LoadingViewProps) {
  const handleBackClick = () => {
    if (!downloadUrl && !errorMsg) {
      alert("아직 폰트를 생성중입니다. 기다려주세요.");
      return;
    }
    onBack();
  };

  return (
    <div className="min-h-screen grid place-items-center px-4">
      <div className="w-full max-w-lg md:max-w-xl lg:max-w-2xl px-6 md:px-8 py-8 md:py-10 rounded-2xl bg-sub/70 shadow-xl backdrop-blur font-paper">
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
              <p className="text-red-400 text-base md:text-lg font-medium leading-tight">
                오류: {errorMsg}
              </p>
              <p className="text-text/60 text-sm md:text-base mt-1">
                서버 로그를 확인하세요.
              </p>
            </>
          ) : (
            <>
              <p className="text-text text-base md:text-lg font-medium leading-tight">
                {message}
              </p>
              <p className="text-text/60 text-sm md:text-base mt-1">
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
            onClick={handleBackClick}
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
