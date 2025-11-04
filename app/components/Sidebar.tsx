interface SidebarProps {
  open: boolean;
  onClose: () => void;
  onInquiryClick: () => void;
}

export default function Sidebar({
  open,
  onClose,
  onInquiryClick,
}: SidebarProps) {
  return (
    <div className="fixed inset-y-0 left-0 z-40 pointer-events-none flex items-center">
      <div className="flex flex-col p-6 gap-4 w-64 lg:w-72 xl:w-80 pointer-events-auto">
        {/* MonoGlyph 로고 - 홈으로 이동 */}
        <a
          href="/"
          className={[
            "transform transition-all duration-300 hover:opacity-80",
            open ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0",
          ].join(" ")}
          style={{ transitionDelay: open ? "0ms" : "200ms" }}
        >
          <div className="flex flex-col px-2 font-italia text-text border-l-4 leading-none cursor-pointer">
            <span className="text-3xl lg:text-4xl">MonoGlyph</span>
            <span className="text-base lg:text-lg">
              Intelligence in Every Stroke
            </span>
          </div>
        </a>

        {/* 프로젝트 소개 버튼 */}
        <a
          href="/introduction"
          className={[
            "p-3 rounded-full border-2 border-text/20 bg-sub shadow-lg hover:bg-sub/80 hover:border-accent transition-all duration-300 group overflow-hidden",
            "transform hover:rounded-3xl",
            open ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0",
            "w-16 h-16 hover:w-48 hover:h-auto",
          ].join(" ")}
          style={{ transitionDelay: open ? "50ms" : "150ms" }}
        >
          <div className="flex items-center justify-start gap-3 whitespace-nowrap h-full">
            <img
              src="/images/Introduction.svg"
              alt="프로젝트 소개"
              className="w-10 h-10 flex-shrink-0 transition-all"
            />
            <span className="text-lg font-paper text-text opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              프로젝트 소개
            </span>
          </div>
        </a>

        {/* 가이드 버튼 */}
        <a
          href="/guide"
          className={[
            "p-3 rounded-full border-2 border-text/20 bg-sub shadow-lg hover:bg-sub/80 hover:border-accent transition-all duration-300 group overflow-hidden",
            "transform hover:rounded-3xl",
            open ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0",
            "w-16 h-16 hover:w-44 hover:h-auto",
          ].join(" ")}
          style={{ transitionDelay: open ? "100ms" : "100ms" }}
        >
          <div className="flex items-center justify-start gap-3 whitespace-nowrap h-full">
            <img
              src="/images/Guide.svg"
              alt="가이드"
              className="w-10 h-10 flex-shrink-0 transition-all"
            />
            <span className="text-lg font-paper text-text opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              사용 가이드
            </span>
          </div>
        </a>

        {/* 문의하기 버튼 */}
        <button
          onClick={onInquiryClick}
          className={[
            "p-3 rounded-full border-2 border-text/20 bg-sub shadow-lg hover:bg-sub/80 hover:border-accent transition-all duration-300 group overflow-hidden",
            "transform hover:rounded-3xl",
            open ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0",
            "w-16 h-16 hover:w-44 hover:h-auto",
          ].join(" ")}
          style={{ transitionDelay: open ? "150ms" : "50ms" }}
        >
          <div className="flex items-center justify-start gap-3 whitespace-nowrap h-full">
            <img
              src="/images/Inquiry.svg"
              alt="문의하기"
              className="w-10 h-10 flex-shrink-0 transition-all"
            />
            <span className="text-lg font-paper text-text opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              문의하기
            </span>
          </div>
        </button>

        {/* 관리자 페이지 버튼 */}
        <a
          href="/admin"
          className={[
            "p-3 rounded-full border-2 border-text/20 bg-sub shadow-lg hover:bg-sub/80 hover:border-accent transition-all duration-300 group overflow-hidden",
            "transform hover:rounded-3xl",
            open ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0",
            "w-16 h-16 hover:w-48 hover:h-auto",
          ].join(" ")}
          style={{ transitionDelay: open ? "175ms" : "25ms" }}
        >
          <div className="flex items-center justify-start gap-3 whitespace-nowrap h-full">
            <img
              src="/images/admin.svg"
              alt="관리자"
              className="w-10 h-10 flex-shrink-0 transition-all"
            />
            <span className="text-lg font-paper text-text opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              관리자 페이지
            </span>
          </div>
        </a>

        {/* X 닫기 버튼 */}
        <button
          onClick={onClose}
          className={[
            "p-3 rounded-full border-2 border-text/20 bg-sub shadow-lg hover:bg-sub/80 hover:border-red-400 transition-all duration-300 flex items-center justify-center group",
            "transform",
            open ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0",
            "w-16 h-16",
          ].join(" ")}
          style={{ transitionDelay: open ? "200ms" : "0ms" }}
          aria-label="사이드바 닫기"
        >
          <svg
            className="w-10 h-10 text-text/70 group-hover:text-red-400 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" strokeWidth={2} />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 9l-6 6m0-6l6 6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
