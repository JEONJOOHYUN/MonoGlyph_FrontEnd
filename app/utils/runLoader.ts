interface StepData {
  stepName: string;
  durationSec: number;
  ok: boolean;
  imageCount: number;
}

interface ImageData {
  id: string;
  filePath: string;
}

interface RunData {
  runId: string;
  startedAt: string;
  endedAt: string;
  totalDurationSec: number;
  ttf_output?: string;
  ttfOutput?: string;
}

interface PromptData {
  name: string;
}

interface SummaryData {
  ttf_output?: string;
}

interface RunItem {
  run: RunData;
  prompt: PromptData;
  steps: StepData[];
  images?: ImageData[];
  summary?: SummaryData;
  ttf_output?: string;
}

export interface RunSummary {
  runId: string;
  promptName: string;
  startedAt: string;
  endedAt: string;
  totalDurationSec: number;
  ok: boolean;
  stepsCount: number;
  successfulSteps: number;
  failedSteps: number;
  totalStepsDuration: number;
  avgStepDuration: number;
  stepsDuration: Array<{
    name: string;
    durationSec: number;
    ok: boolean;
    imageCount: number;
  }>;
  images: Array<{ id: string; filePath: string }>;
  ttfOutput?: string;
}

export async function loadAllRunSummaries(): Promise<RunSummary[]> {
  try {
    const response = await fetch("/api/runs/prompts", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch runs: ${response.statusText}`);
    }

    const data = await response.json();

    // API가 배열을 반환하는지 확인
    const dataArray = Array.isArray(data) ? data : [data];

    // 각 항목을 RunSummary 형식으로 변환
    const summaries: RunSummary[] = dataArray
      .filter((item: RunItem) => item && item.run && item.prompt && item.steps)
      .map((item: RunItem) => {
        const ttfOutput =
          item.summary?.ttf_output ||
          item.ttf_output ||
          item.run?.ttf_output ||
          item.run?.ttfOutput;

        return {
          runId: item.run.runId,
          promptName: item.prompt.name,
          startedAt: item.run.startedAt,
          endedAt: item.run.endedAt,
          totalDurationSec: item.run.totalDurationSec,
          ok: item.steps.every((step: StepData) => step.ok),
          stepsCount: item.steps.length,
          successfulSteps: item.steps.filter((step: StepData) => step.ok)
            .length,
          failedSteps: item.steps.filter((step: StepData) => !step.ok).length,
          totalStepsDuration: item.steps.reduce(
            (sum: number, step: StepData) => sum + step.durationSec,
            0
          ),
          avgStepDuration:
            item.steps.length > 0
              ? item.steps.reduce(
                  (sum: number, step: StepData) => sum + step.durationSec,
                  0
                ) / item.steps.length
              : 0,
          stepsDuration: item.steps.map((step: StepData) => ({
            name: step.stepName,
            durationSec: step.durationSec,
            ok: step.ok,
            imageCount: step.imageCount,
          })),
          images: (item.images || []).map((img: ImageData) => ({
            id: img.id,
            filePath: img.filePath,
          })),
          ttfOutput,
        };
      });

    // 최신순으로 정렬 (runId 기준 내림차순)
    summaries.sort((a, b) => b.runId.localeCompare(a.runId));

    return summaries;
  } catch (error) {
    console.error("Error loading run summaries:", error);
    return [];
  }
}

export function parseRunId(runId: string): { date: string; time: string } {
  const match = runId.match(/run-(\d{8})_(\d{6})/);
  if (!match) {
    return { date: "Unknown", time: "Unknown" };
  }

  const [, dateStr, timeStr] = match;
  const year = dateStr.substring(0, 4);
  const month = dateStr.substring(4, 6);
  const day = dateStr.substring(6, 8);
  const hour = timeStr.substring(0, 2);
  const minute = timeStr.substring(2, 4);
  const second = timeStr.substring(4, 6);

  const date = `${year}-${month}-${day}`;
  const time = `${hour}:${minute}:${second}`;

  return { date, time };
}
