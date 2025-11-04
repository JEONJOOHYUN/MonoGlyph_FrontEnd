import { NextResponse } from "next/server";
import axios from "axios";

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
    const response = await axios.get(`${API_BASE_URL}/api/runs/prompts`, {
      headers: {
        "Cache-Control": "no-store",
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching prompts:", error);

    const errorMessage =
      axios.isAxiosError(error) && error.response
        ? `API responded with status: ${error.response.status}`
        : "Failed to fetch prompts data";

    const status =
      axios.isAxiosError(error) && error.response?.status
        ? error.response.status
        : 500;

    return NextResponse.json({ error: errorMessage }, { status });
  }
}
