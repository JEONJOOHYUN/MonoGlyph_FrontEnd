export interface PromptData {
  id: string;
  name: string;
  createdAt: string;
}

export interface RunData {
  runId: string;
  promptId: string;
  startedAt: string;
  endedAt: string;
  totalDurationSec: number;
}

export interface StepData {
  runId: string;
  stepName: string;
  startedAt: string;
  endedAt: string;
  durationSec: number;
  ok: boolean;
  imageCount: number;
}

export interface ImageData {
  id: string;
  promptId: string;
  runId: string;
  filePath: string;
  createdAt: string;
}

export interface SummaryData {
  ttf_output: string;
}

export interface RunResponse {
  prompt: PromptData;
  run: RunData;
  steps: StepData[];
  images: ImageData[];
  summary: SummaryData;
}
