import { NextResponse } from "next/server";

const API_BASE_URL = "http://localhost:8080";

export async function GET() {
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
