/**
 * MonoGlyph Font Generator API
 */

const API_BASE = (
  process.env.NEXT_PUBLIC_FONT_GENERATOR_API_URL ||
  process.env.FONT_GENERATOR_API_URL ||
  ""
).replace(/\/+$/, "");

if (!API_BASE) {
  throw new Error(
    "Font Generator API URL is not configured. Please set NEXT_PUBLIC_FONT_GENERATOR_API_URL or FONT_GENERATOR_API_URL in your environment variables."
  );
}

// 타입 정의
export type ProgressEvent = {
  progress: number;
  message: string;
  stage: "init" | "gpt_api" | "preprocessing" | "inference" | "fontforge";
};

export type CompleteEvent = {
  progress: number;
  message: string;
  stage: "complete";
  work_dir: string;
  filename: string;
};

export type ErrorEvent = {
  error: string;
  details?: string;
};

export type SSEEvent = ProgressEvent | CompleteEvent | ErrorEvent;

/**
 * 폰트 생성 요청 (SSE 스트리밍)
 */
export function generateFont(
  prompt: string,
  onProgress: (event: ProgressEvent) => void,
  onComplete: (event: CompleteEvent) => void,
  onError: (event: ErrorEvent) => void
): EventSource {
  const url = `${API_BASE}/generate`;

  // POST 요청을 위해 fetch 사용
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      function readStream() {
        reader?.read().then(({ done, value }) => {
          if (done) return;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("event:")) {
              // const eventType = line.substring(6).trim();
              continue;
            }

            if (line.startsWith("data:")) {
              const data = line.substring(5).trim();
              try {
                const parsed = JSON.parse(data);

                if ("error" in parsed) {
                  onError(parsed as ErrorEvent);
                } else if (parsed.stage === "complete") {
                  onComplete(parsed as CompleteEvent);
                } else {
                  onProgress(parsed as ProgressEvent);
                }
              } catch (e) {
                console.error("Failed to parse SSE data:", e);
              }
            }
          }

          readStream();
        });
      }

      readStream();
    })
    .catch((error) => {
      onError({ error: error.message });
    });

  // EventSource 대신 fetch를 사용하므로 더미 객체 반환
  return {
    close: () => {},
  } as EventSource;
}

/**
 * TTF 파일 다운로드 URL 생성
 */
export function getDownloadUrl(workDir: string, filename: string): string {
  return `${API_BASE}/download/${workDir}/${filename}`;
}
