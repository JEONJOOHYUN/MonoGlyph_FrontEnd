import { NextResponse } from "next/server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_API_URL || process.env.BACKEND_API_URL || "";

export async function GET() {
  if (!API_BASE_URL) {
    return NextResponse.json(
      {
        error:
          "Backend API URL is not configured. Please set NEXT_PUBLIC_BACKEND_API_URL or BACKEND_API_URL in your environment variables.",
      },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/runs/prompts`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching prompts:", error);
    return NextResponse.json(
      { error: "Failed to fetch prompts data" },
      { status: 500 }
    );
  }
}
