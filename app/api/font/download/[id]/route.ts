import { NextRequest, NextResponse } from "next/server";

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

    // 실제 구현에서는 생성된 폰트 파일을 반환
    // 여기서는 더미 TTF 파일을 생성하여 반환
    const dummyTTFContent = createDummyTTF(id);

    return new NextResponse(dummyTTFContent, {
      status: 200,
      headers: {
        "Content-Type": "font/ttf",
        "Content-Disposition": `attachment; filename="generated-font-${id}.ttf"`,
        "Cache-Control": "public, max-age=31536000",
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json(
      { message: "다운로드 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// 더미 TTF 파일 생성 (실제로는 폰트 생성 엔진에서 생성된 파일을 사용)
function createDummyTTF(id: string): Buffer {
  // 실제 TTF 파일의 최소 헤더 구조
  const ttfHeader = Buffer.from([
    0x00,
    0x01,
    0x00,
    0x00, // sfnt version
    0x00,
    0x0c, // numTables
    0x00,
    0x80, // searchRange
    0x00,
    0x03, // entrySelector
    0x00,
    0x20, // rangeShift
  ]);

  // 실제로는 완전한 TTF 파일을 생성해야 하지만,
  // 여기서는 데모용으로 간단한 바이너리 데이터를 생성
  const content = Buffer.concat([
    ttfHeader,
    Buffer.from(`Generated font for ${id}`, "utf-8"),
    Buffer.alloc(1024, 0), // 패딩
  ]);

  return content;
}
