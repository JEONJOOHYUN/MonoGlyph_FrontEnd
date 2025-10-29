"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import InquiryModal from "../components/InquiryModal";

export default function IntroductionPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onInquiryClick={() => setInquiryModalOpen(true)}
      />

      <div className="flex items-center justify-center p-4 md:p-8 min-h-screen">
        <div className="max-w-4xl w-full">
          {/* 헤더 */}
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-italia text-text mb-3 tracking-tight">
              MonoGlyph
            </h1>
            <p className="text-lg md:text-xl text-text/60 font-paper">
              Intelligence in Every Stroke
            </p>
          </div>

          <div className="space-y-8">
            {/* 소개 */}
            <div
              className="group relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-sub to-bg border border-text/10 hover:border-accent/30 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/5 animate-fade-in-up overflow-hidden"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-paper">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>한이음 드림업 참가작</span>
                  </div>
                </div>
                <p className="text-text/90 font-paper leading-relaxed text-lg md:text-xl">
                  <span className="font-bold text-accent">LLM, GAN</span> 기반의
                  딥러닝으로{" "}
                  <span className="font-semibold text-text">손글씨 없이도</span>{" "}
                  원하는 스타일의 한글 폰트를 자동 생성합니다.
                </p>
              </div>
            </div>

            {/* 문제점 */}
            <div
              className="group p-8 md:p-10 rounded-3xl bg-gradient-to-br from-red-50/30 to-orange-50/30 border border-red-200/40 hover:border-red-300/60 transition-all duration-500 hover:shadow-xl animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-red-100/80 text-red-700 text-sm font-paper mb-6">
                Problem
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-2xl mb-3">
                    ⏱️
                  </div>
                  <h3 className="font-semibold text-text text-lg">
                    시간과 비용
                  </h3>
                  <p className="text-text/70 text-sm leading-relaxed">
                    한글 11,172자를 모두 제작하는 막대한 작업량
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-2xl mb-3">
                    ⚖️
                  </div>
                  <h3 className="font-semibold text-text text-lg">
                    저작권 문제
                  </h3>
                  <p className="text-text/70 text-sm leading-relaxed">
                    무단 사용으로 인한 법적 리스크
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-2xl mb-3">
                    🛠️
                  </div>
                  <h3 className="font-semibold text-text text-lg">전문 기술</h3>
                  <p className="text-text/70 text-sm leading-relaxed">
                    폰트 제작 도구 사용의 높은 진입장벽
                  </p>
                </div>
              </div>
            </div>

            {/* 솔루션 */}
            <div
              className="group relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-emerald-50/40 to-teal-50/40 border border-emerald-200/50 hover:border-emerald-300/70 transition-all duration-500 hover:shadow-xl animate-fade-in-up overflow-hidden"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-200/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-100/80 text-emerald-700 text-sm font-paper mb-6">
                  Solution
                </div>
                <p className="text-text/90 font-paper leading-relaxed text-lg md:text-xl">
                  <span className="font-bold text-emerald-700">AI 기술</span>로
                  이러한 문제를 해결하고,{" "}
                  <span className="font-semibold text-teal-700">
                    신속하고 저렴하며 창의적인
                  </span>{" "}
                  폰트 제작 환경을 제공합니다.
                </p>
              </div>
            </div>

            {/* GitHub */}
            <div
              className="p-8 md:p-10 rounded-3xl bg-gradient-to-br from-slate-50/50 to-gray-50/50 border border-text/10 hover:border-text/20 transition-all duration-500 animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-text/5 text-text/70 text-sm font-paper mb-6">
                Open Source
              </div>
              <p className="text-text/70 font-paper mb-6 text-base">
                오픈소스로 공개된 프로젝트입니다. 자유롭게 확인하고
                기여해주세요!
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://github.com/JEONJOOHYUN/MonoGlyph_FrontEnd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-bg border border-text/10 hover:border-accent/50 hover:bg-sub transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                >
                  <svg
                    className="w-5 h-5 text-text/60 group-hover/link:text-accent transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span className="font-paper text-text/80 group-hover/link:text-text transition-colors">
                    Frontend
                  </span>
                </a>
                <a
                  href="https://github.com/sheepright/MonoGlyph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-bg border border-text/10 hover:border-accent/50 hover:bg-sub transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                >
                  <svg
                    className="w-5 h-5 text-text/60 group-hover/link:text-accent transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span className="font-paper text-text/80 group-hover/link:text-text transition-colors">
                    폰트 생성 AI
                  </span>
                </a>
              </div>
            </div>
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
