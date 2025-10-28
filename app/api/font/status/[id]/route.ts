import { NextRequest, NextResponse } from "next/server";

// 임시 저장소 (실제로는 데이터베이스나 Redis 등을 사용)
const fontJobs: Record<
  string,
  {
    id: string;
    status: "pending" | "processing" | "completed" | "failed";
    progress: number;
    message: string;
    downloadUrl?: string;
    error?: string;
    createdAt: number;
  }
> = {};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { message: "폰트 ID가 필요합니다." },
        { status: 400 }
      );
    }

    // 실제 구현에서는 데이터베이스에서 상태를 조회
    let job = fontJobs[id];

    if (!job) {
      // 새로운 작업이면 초기 상태로 생성
      job = {
        id,
        status: "processing",
        progress: 0,
        message: "프롬프트 분석 중",
        createdAt: Date.now(),
      };
      fontJobs[id] = job;
    }

    // 시뮬레이션: 시간에 따른 진행률 업데이트
    const elapsed = Date.now() - job.createdAt;
    const progressSteps = [
      {
        time: 0,
        progress: 0,
        message: "프롬프트 분석 중",
        status: "processing" as const,
      },
      {
        time: 2000,
        progress: 20,
        message: "글리프 생성 중",
        status: "processing" as const,
      },
      {
        time: 5000,
        progress: 40,
        message: "커닝·힌팅 최적화",
        status: "processing" as const,
      },
      {
        time: 8000,
        progress: 60,
        message: "미리보기 렌더링",
        status: "processing" as const,
      },
      {
        time: 10000,
        progress: 80,
        message: "TTF 패키징 중",
        status: "processing" as const,
      },
      {
        time: 12000,
        progress: 100,
        message: "TTF 패키징 완료",
        status: "completed" as const,
      },
    ];

    const currentStep =
      progressSteps.reverse().find((step) => elapsed >= step.time) ||
      progressSteps[0];

    job.progress = currentStep.progress;
    job.message = currentStep.message;
    job.status = currentStep.status;

    if (job.status === "completed") {
      job.downloadUrl = `/api/font/download/${id}`;
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error("Status check error:", error);
    return NextResponse.json(
      { message: "상태 확인 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
