"use client";

import { useState, useEffect, useMemo } from "react";
import RunCard from "./RunCard";
import { loadAllRunSummaries, RunSummary } from "../utils/runLoader";
import SearchBar from "./SearchBar";
import { useLocalStorage } from "../hooks/useLocalStorage";
import {
  DEFAULT_TEMPLATES,
  TEMPLATES_STORAGE_KEY,
} from "../constants/templates";
import { PAGE_SIZE } from "../constants/pagination";

interface RunGridProps {
  onRunSelect?: (runId: string) => void;
}

export default function RunGrid({ onRunSelect }: RunGridProps) {
  const [allRuns, setAllRuns] = useState<RunSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [previewText, setPreviewText] = useState("한이음 드림업 화이팅");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // 템플릿 관리 (localStorage 사용)
  const [templates, setTemplates] = useLocalStorage<string[]>(
    TEMPLATES_STORAGE_KEY,
    DEFAULT_TEMPLATES
  );

  useEffect(() => {
    loadAllRunSummaries()
      .then((summaries) => {
        setAllRuns(summaries);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading run summaries:", error);
        setError("Failed to load run data");
        setLoading(false);
      });
  }, []);

  // 검색어로 필터링된 runs
  const filteredRuns = useMemo(() => {
    if (!searchQuery.trim()) {
      return allRuns;
    }

    const query = searchQuery.toLowerCase().trim();
    return allRuns.filter((run) => {
      // promptName에서만 검색
      return run.promptName?.toLowerCase().includes(query);
    });
  }, [allRuns, searchQuery]);

  // ✅ 검색 결과가 변경될 때 첫 페이지로 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredRuns.length]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // ✅ 총 페이지 수 계산 (최소 1페이지 보장)
  const totalPages = Math.max(1, Math.ceil(filteredRuns.length / PAGE_SIZE));

  // ✅ 현재 페이지에 표시할 아이템 슬라이스
  const pagedRuns = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return filteredRuns.slice(start, end);
  }, [filteredRuns, currentPage]);

  const gotoPage = (page: number) => {
    // 경계 체크
    const next = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(next);
    // 페이지 이동 시 상단으로 스크롤(선택 사항)
    // window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-16"></div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="h-8 bg-gray-200 rounded mb-1"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
              </div>
              <div className="text-center">
                <div className="h-8 bg-gray-200 rounded mb-1"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="h-2 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg font-medium mb-2">
          Error Loading Runs
        </div>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* 로고 */}
      <div className="ml-[-18px] flex items-center gap-3">
        <img
          src="/images/MainLogo.svg"
          alt="Main Logo"
          className="w-25 h-25 object-contain"
        />

        <div className="ml-[-25px] flex flex-col font-italia leading-none">
          <div className="text-4xl">MonoGlyph</div>
          <div className="text-lg">Intelligence in Every Stroke</div>
        </div>
      </div>

      {/* 검색창과 버튼 */}
      <div className="flex items-center justify-between gap-4 mb-2">
        <div className="flex-1">
          <SearchBar
            placeholder="원하는 글자 스타일을 검색하세요."
            onSearch={handleSearch}
          />
        </div>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-[#8a9d7a] text-white rounded-lg shadow-md transition-colors duration-200 whitespace-nowrap"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span className="font-medium">유저 페이지</span>
        </a>
      </div>

      {/* Font Preview Text Input */}
      <div className="my-6 bg-sub rounded-lg p-4 shadow-lg">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          글자 미리보기
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={previewText}
            onChange={(e) => setPreviewText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && previewText.trim()) {
                setTemplates([...templates, previewText.trim()]);
              }
            }}
            placeholder="폰트를 테스트하고 싶은 문구를 입력하세요."
            className="flex-1 px-3 py-2 border-0 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
          />
          <button
            onClick={() => {
              if (previewText.trim()) {
                setTemplates([...templates, previewText.trim()]);
              }
            }}
            className="px-4 py-2 bg-accent hover:bg-[#8a9d7a] text-white rounded-md transition-colors whitespace-nowrap"
            title="현재 텍스트를 템플릿으로 추가"
          >
            템플릿 추가
          </button>
        </div>

        {/* 템플릿 버튼들 */}
        <div className="mt-3 flex flex-wrap gap-2">
          {templates.map((template, index) => (
            <div key={index} className="relative group">
              <button
                onClick={() => setPreviewText(template)}
                className={`px-3 py-1 text-xs text-white rounded-full transition-colors ${
                  index % 2 === 0
                    ? "bg-[color:var(--color-terra)] hover:bg-[color:#B86F52]"
                    : "bg-[color:var(--color-dusty)] hover:bg-[color:#678A96]"
                }`}
              >
                {template}
              </button>
              <button
                onClick={() => {
                  setTemplates(templates.filter((_, i) => i !== index));
                }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 hover:bg-red-600 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                title="삭제"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 요약 통계 */}
      <div className="bg-sub rounded-lg p-4 shadow-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-text">
              {filteredRuns.length}
            </div>
            <div className="text-sm text-gray-600">
              {searchQuery ? "검색 결과" : "전체 실행 수"}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">
              {filteredRuns.filter((run) => run.ok).length}
            </div>
            <div className="text-sm text-gray-600">성공</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-terra">
              {filteredRuns.filter((run) => !run.ok).length}
            </div>
            <div className="text-sm text-gray-600">실패</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-text">
              {Math.round(
                filteredRuns.reduce(
                  (sum, run) => sum + run.totalDurationSec,
                  0
                ) / 60
              )}
              분
            </div>
            <div className="text-sm text-gray-600">총 소요 시간</div>
          </div>
        </div>
      </div>

      {/* 데이터가 없을 때 메시지 */}
      {filteredRuns.length === 0 ? (
        <div className="mt-6 text-center py-12 bg-sub rounded-lg">
          <div className="text-gray-600 text-lg font-medium mb-2">
            {searchQuery ? "검색 결과 없음" : "No Runs Found"}
          </div>
          <p className="text-gray-500">
            {searchQuery
              ? `"${searchQuery}"에 대한 검색 결과가 없습니다.`
              : "No font generation runs are available."}
          </p>
        </div>
      ) : (
        <>
          {/* 카드 그리드 (페이지네이션 적용) */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {pagedRuns.map((run) => (
              <RunCard key={run.runId} run={run} previewText={previewText} />
            ))}
          </div>

          {/* 페이지네이션 컨트롤 */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <button
              onClick={() => gotoPage(1)}
              disabled={currentPage === 1}
              className="px-2 py-1 rounded-md border border-gray-300 bg-sub disabled:opacity-40"
              aria-label="First page"
            >
              «
            </button>
            <button
              onClick={() => gotoPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-2 py-1 rounded-md border border-gray-300 bg-sub disabled:opacity-40"
              aria-label="Previous page"
            >
              이전
            </button>

            <span className="px-2 py-2 text-sm text-gray-700 select-none">
              {currentPage} / {totalPages}
            </span>

            <button
              onClick={() => gotoPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 rounded-md border border-gray-300 bg-sub disabled:opacity-40"
              aria-label="Next page"
            >
              다음
            </button>
            <button
              onClick={() => gotoPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 rounded-md border border-gray-300 bg-sub disabled:opacity-40"
              aria-label="Last page"
            >
              »
            </button>
          </div>
        </>
      )}
    </div>
  );
}
