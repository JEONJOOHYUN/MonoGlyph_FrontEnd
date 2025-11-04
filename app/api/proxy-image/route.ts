import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const imageUrl = searchParams.get("url");

  if (!imageUrl) {
    return NextResponse.json(
      { error: "URL parameter is required" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(imageUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
      responseType: "arraybuffer",
    });

    const contentType = response.headers["content-type"] || "image/png";

    return new NextResponse(response.data, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error proxying image:", error);

    const errorMessage =
      axios.isAxiosError(error) && error.response
        ? `Failed to fetch image: ${error.response.statusText || error.message}`
        : "Failed to proxy image";

    const status =
      axios.isAxiosError(error) && error.response?.status
        ? error.response.status
        : 500;

    return NextResponse.json({ error: errorMessage }, { status });
  }
}
