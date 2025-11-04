"use client";

import { parseRunId, RunSummary } from "../utils/runLoader";
import { formatStepName } from "../constants/stepNames";
import {
  formatDuration,
  formatSecDuration,
  formatPercent,
} from "../utils/formatters";
import { useFontLoader } from "../hooks/useFontLoader";
import GeneratedImages from "./GeneratedImages";

interface RunCardProps {
  run: RunSummary;
  previewText?: string;
}

export default function RunCard({
  run,
  previewText = "가나다라마바사아자차카타파하",
}: RunCardProps) {
  const { date, time } = parseRunId(run.runId);
  const fontName = `MonoGlyph-${run.runId}`;
  const { fontFamily, fontLoaded, fontError } = useFontLoader(
    run.ttfOutput,
    fontName
  );

  return (
    <div className="bg-sub rounded-lg p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3
          className="text-lg font-semibold text-text max-w-full truncate"
          title={run.promptName || run.runId}
        >
          {run.promptName || run.runId}
        </h3>
      </div>

      {/* Date and Time */}
      <div className="mb-4">
        <div className="text-sm text-text">
          <span className="font-medium">
            생성일 : {date} {time}
          </span>
        </div>
      </div>

      {/* Step Durations */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-text">각 스텝 실행 시간</span>
          <span className="text-xs text-gray-500">
            총 {formatDuration(run.totalStepsDuration ?? run.totalDurationSec)}
          </span>
        </div>

        <div className="space-y-2">
          {run.stepsDuration?.map((s, idx) => {
            const total =
              run.totalStepsDuration && run.totalStepsDuration > 0
                ? run.totalStepsDuration
                : run.totalDurationSec;

            const pct =
              total > 0
                ? Math.ceil((s.durationSec / total) * 100 * 100) / 100
                : 0;
            const barColor = s.ok === false ? "bg-red-500" : "bg-accent";

            return (
              <div key={`${s.name}-${idx}`}>
                <div className="flex justify-between text-xs text-gray-600 mb-1 items-center">
                  <span
                    className="truncate max-w-[60%]"
                    title={formatStepName(s.name)}
                  >
                    {formatStepName(s.name)}
                  </span>
                  <span className="flex items-center gap-2 whitespace-nowrap">
                    {formatSecDuration(s.durationSec)} ({formatPercent(pct)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${barColor}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>

                {/* gpt_api 스텝: 이미지 표시 */}
                {s.name === "gpt_api" && run.images.length > 0 && (
                  <div className="mt-3 border border-gray-200 rounded-md p-3 bg-main">
                    <GeneratedImages images={run.images} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Font Preview */}
      <div className="border-t border-gray-200 pt-4">
        <div className="text-xs text-gray-500 mb-2">글자 미리보기</div>

        <div className="bg-main rounded-lg p-4 min-h-[80px] flex items-center justify-center">
          {fontError ? (
            <div className="text-center w-full">
              <div className="text-red-500 text-xs mb-2">
                폰트를 불러올 수 없습니다.
              </div>
              <div
                className="text-lg font-medium text-gray-800 leading-relaxed"
                style={{ wordBreak: "break-all" }}
              >
                {previewText}
              </div>
            </div>
          ) : !fontLoaded ? (
            <div className="text-center w-full">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600" />
                <span className="text-blue-600 text-xs">폰트 로딩 중...</span>
              </div>
              <div
                className="text-lg font-medium text-gray-800 leading-relaxed"
                style={{ wordBreak: "break-all" }}
              >
                {previewText}
              </div>
            </div>
          ) : (
            <div
              className="text-lg text-gray-800 leading-relaxed text-center"
              style={{
                wordBreak: "break-all",
                fontFamily:
                  fontFamily ??
                  "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
              }}
            >
              {previewText}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
