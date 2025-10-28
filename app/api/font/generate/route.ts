import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, style, weight, options } = body;

    // 입력 검증
    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return NextResponse.json(
        { message: "프롬프트를 입력해주세요." },
        { status: 400 }
      );
    }

    // 폰트 생성 작업 ID 생성 (실제로는 UUID 등을 사용)
    const fontId = `font_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    // 실제 구현에서는 여기서 폰트 생성 서비스를 호출하거나
    // 큐에 작업을 추가하는 로직이 들어갑니다.
    console.log("Font generation started:", {
      id: fontId,
      prompt,
      style,
      weight,
      options,
    });

    // 응답 반환
    return NextResponse.json({
      id: fontId,
      status: "pending",
      progress: 0,
      message: "폰트 생성 작업이 시작되었습니다.",
    });
  } catch (error) {
    console.error("Font generation error:", error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
