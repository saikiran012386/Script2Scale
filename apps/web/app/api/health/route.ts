import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      timestamp: new Date().toISOString(),
      service: "script2scale-web",
      environment: process.env.NODE_ENV || "production"
    },
    { status: 200 }
  );
}
