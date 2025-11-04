"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import InquiryModal from "../components/InquiryModal";

export default function GuidePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "메뉴 사용법",
      content: (
        <div className="space-y-4 text-text/80 font-paper leading-loose">
          <p className="text-text font-semibold text-lg">
            🎯 MonoGlyph를 더 편리하게 사용하는 방법
          </p>

          <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 rounded-xl p-4 border-l-4 border-blue-400">
            <div className="flex items-start gap-3 mb-3">
              <div>
                <p className="font-semibold text-text mb-2">사이드 메뉴바</p>
                <p className="text-sm text-text/70">
                  스타일 입력창 왼쪽 아이콘이나{" "}
                  <span className="font-bold text-blue-700">
                    각 페이지 ☰ 아이콘
                  </span>
                  을 클릭하면 사이드바가 열립니다.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="font-semibold text-text">📋 사이드바 메뉴</p>

            <div className="flex items-start gap-2 pl-4">
              <span className="text-accent font-bold mt-1">•</span>
              <div>
                <p className="text-text/90">
                  <span className="font-bold text-teal-700">
                    MonoGlyph 로고
                  </span>
                </p>
                <p className="text-sm text-text/60">
                  클릭하면 메인 페이지로 이동합니다
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 pl-4">
              <span className="text-accent font-bold mt-1">•</span>
              <div>
                <p className="text-text/90">
                  <span className="font-bold text-teal-700">프로젝트 소개</span>
                </p>
                <p className="text-sm text-text/60">
                  MonoGlyph의 특징과 목표를 확인할 수 있습니다
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 pl-4">
              <span className="text-accent font-bold mt-1">•</span>
              <div>
                <p className="text-text/90">
                  <span className="font-bold text-teal-700">사용 가이드</span>
                </p>
                <p className="text-sm text-text/60">
                  폰트 생성 방법을 단계별로 안내합니다
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 pl-4">
              <span className="text-accent font-bold mt-1">•</span>
              <div>
                <p className="text-text/90">
                  <span className="font-bold text-teal-700">문의하기</span>
                </p>
                <p className="text-sm text-text/60">
                  버그 신고 및 개선 사항을 전달할 수 있습니다
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 pl-4">
              <span className="text-accent font-bold mt-1">•</span>
              <div>
                <p className="text-text/90">
                  <span className="font-bold text-teal-700">관리자 페이지</span>
                </p>
                <p className="text-sm text-text/60">
                  비밀번호 인증 후 관리자 페이지로 이동합니다
                </p>
              </div>
            </div>
          </div>

          <div className="bg-accent/10 rounded-lg p-3 mt-4">
            <p className="text-text text-sm">
              💡 각 메뉴 버튼에 마우스를 올리면 전체 이름이 표시됩니다
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "1. 폰트 생성 방법",
      content: (
        <div className="space-y-4 text-text/80 font-paper leading-loose">
          <p>
            사용자는 입력창에 자신이 원하는 폰트 스타일을{" "}
            <span className="text-accent font-semibold">자유롭게 입력</span>할
            수 있습니다.
          </p>

          <div className="pl-4 py-3 border-l-2 border-accent/30 bg-bg/50 rounded-r-lg">
            <p className="text-sm text-text/60 mb-1">💡 예시</p>
            <p className="text-text italic">
              &ldquo;MMORPG에서 사용할 중세시대 느낌의 글씨체 폰트&rdquo;
            </p>
          </div>

          <div className="relative bg-gradient-to-br from-emerald-50/80 to-teal-50/80 rounded-2xl p-6 border-2 border-accent/40 shadow-sm backdrop-blur-sm">
            <div className="absolute top-3 right-3 text-3xl opacity-70 animate-pulse">
              ✨
            </div>
            <p className="text-text font-semibold text-lg mb-4 flex items-center gap-2">
              <span className="text-lg pb-1">⭐</span>
              <span>핵심 팁</span>
            </p>
            <p className="text-text/90 leading-relaxed mb-4">
              <span className="font-bold text-emerald-700 text-lg">
                구체적으로 작성할수록
              </span>{" "}
              AI가 의도에 맞는 폰트를 더 정확하게 생성합니다.
            </p>
            <div className="space-y-3 pt-3 border-t border-accent/30">
              <div className="flex items-start gap-2">
                <span className="text-accent font-bold mt-1">•</span>
                <p className="text-text/80">
                  <span className="font-bold text-teal-700">글자의 형태</span>
                  <span className="text-text/50 text-sm ml-2">
                    (고딕, 명조, 손글씨체 등)
                  </span>
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-accent font-bold mt-1">•</span>
                <p className="text-text/80">
                  <span className="font-bold text-teal-700">
                    두께와 같은 명확한 형태
                  </span>
                  <span className="text-text/50 text-sm ml-2">
                    (굵은, 얇은, 두꺼운 등)
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2. 생성 과정 확인",
      content: (
        <div className="space-y-4 text-text/80 font-paper leading-loose">
          <p>
            폰트 생성이 시작되면{" "}
            <span className="text-accent font-semibold">
              진행률과 현재 상태
            </span>
            를 실시간으로 확인할 수 있습니다.
          </p>

          <div className="bg-gradient-to-r from-purple-50/80 to-pink-50/80 rounded-xl p-4 border-l-4 border-purple-400">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl animate-bounce">⏱️</span>
              <span className="font-semibold text-text">예상 소요 시간</span>
            </div>
            <p className="text-text/80">
              평균적으로{" "}
              <span className="font-bold text-purple-700">8~10분</span> 정도
              소요됩니다.
            </p>
            <p className="text-text/60 text-sm mt-2">
              💡 생성이 완료될 때까지 잠시만 기다려주세요.
            </p>
          </div>

          <div className="flex items-start gap-3 bg-bg/50 rounded-lg p-3">
            <span className="text-2xl pb-1.5">📊</span>
            <div>
              <p className="font-semibold text-text mb-1">실시간 진행상황</p>
              <p className="text-sm text-text/70">
                진행 상황을 단계별로 확인하며 현재 어떤 작업이 진행 중인지 알 수
                있습니다.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "3. 폰트 다운로드",
      content: (
        <div className="space-y-4 text-text/80 font-paper leading-loose">
          <p>
            생성이 완료되면{" "}
            <span className="text-accent font-semibold">TTF 다운로드 버튼</span>
            이 활성화됩니다.
          </p>

          <div className="flex items-start gap-3 bg-bg/50 rounded-lg p-3">
            <span className="text-2xl">📥</span>
            <div>
              <p className="font-semibold text-text mb-1">파일 형식</p>
              <p className="text-sm text-text/70">
                <span className="font-mono font-semibold text-teal-700">
                  MonoGlyph.ttf
                </span>{" "}
                형태로 파일이 생성됩니다.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-50/80 to-orange-50/80 rounded-xl p-4 border-l-4 border-red-400">
            <div className="flex items-start gap-2">
              <span className="text-xl mt-0.5 animate-pulse">⚠️</span>
              <div>
                <p className="font-semibold text-text mb-2">사용 제한 안내</p>
                <p className="text-text/80 text-sm">
                  현재 생성된 폰트는{" "}
                  <span className="font-bold text-red-700">
                    Microsoft Word에서 사용이 불가능
                  </span>
                  합니다.
                </p>
                <p className="text-text/60 text-sm mt-2">
                  💡 포토샵, 일러스트레이터 등 다른 디자인 프로그램에서는
                  정상적으로 사용 가능합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const handleCardClick = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-bg">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onInquiryClick={() => setInquiryModalOpen(true)}
      />

      <div className="flex items-center justify-center p-4 md:p-8 min-h-screen">
        <div className="max-w-7xl w-full">
          <div className="text-center mb-16 animate-fade-in">
            <button
              onClick={() => setSidebarOpen(true)}
              className="mb-6 p-2 rounded-full hover:bg-sub/50 transition-all duration-300 hover:scale-110"
              aria-label="메뉴 열기"
            >
              <svg
                className="w-6 h-6 text-text/60 hover:text-accent transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-paper text-text mb-3 tracking-tight">
              가이드
            </h1>
            <p className="text-lg md:text-xl text-text/60 font-paper">
              MonoGlyph 사용 가이드
            </p>
          </div>

          {/* 3D 캐러셀 */}
          <div className="relative h-[600px] md:h-[700px] flex items-center justify-center perspective-1000">
            <div className="relative w-full h-full flex items-center justify-center">
              {slides.map((slide, index) => {
                const offset = index - currentSlide;
                const isActive = offset === 0;

                return (
                  <div
                    key={index}
                    onClick={() => handleCardClick(index)}
                    className={`absolute transition-all duration-700 ease-out cursor-pointer ${
                      isActive ? "z-30" : "z-10"
                    }`}
                    style={{
                      transform: `
                        translateX(${offset * 500}px)
                        rotateY(${offset * -15}deg)
                      `,
                      opacity: Math.abs(offset) > 1 ? 0 : isActive ? 1 : 0.6,
                      pointerEvents: Math.abs(offset) > 1 ? "none" : "auto",
                    }}
                  >
                    <div
                      className={`w-[320px] md:w-[500px] lg:w-[650px] h-[500px] md:h-[600px] p-6 md:p-8 bg-sub rounded-2xl border-2 transition-all duration-700 overflow-y-auto scrollbar-hide ${
                        isActive
                          ? "border-accent shadow-2xl"
                          : "border-text/20 shadow-lg"
                      }`}
                    >
                      <h2 className="text-xl md:text-2xl lg:text-3xl font-paper text-text mb-4 md:mb-5 border-l-4 border-accent pl-4">
                        {slide.title}
                      </h2>
                      <div className={isActive ? "" : "opacity-70"}>
                        {slide.content}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 인디케이터 */}
          <div className="flex justify-center gap-2 mt-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "w-8 bg-accent"
                    : "w-2 bg-text/30 hover:bg-text/50"
                }`}
                aria-label={`슬라이드 ${index + 1}로 이동`}
              />
            ))}
          </div>
        </div>
      </div>

      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
      />
    </div>
  );
}
