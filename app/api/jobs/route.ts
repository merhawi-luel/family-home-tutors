import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

// --- GET JOBS ---
export async function GET() {
  try {
    const jobs = await redis.get("jobs");
    return NextResponse.json(Array.isArray(jobs) ? jobs : []);
  } catch (err) {
    console.error("GET error:", err);
    return NextResponse.json([], { status: 500 });
  }
}

// --- ADD JOB ---
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const existing = await redis.get("jobs");
    const jobs = Array.isArray(existing) ? existing : [];

    const newJob = {
      ...body,
      id: Date.now(),
    };

    const updatedJobs = [newJob, ...jobs];

    await redis.set("jobs", updatedJobs);

    return NextResponse.json(newJob);
  } catch (err: any) {
    console.error("🔥 FULL POST ERROR:", err);

    return NextResponse.json(
      { error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}

// --- DELETE JOB ---
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    const existing = await redis.get("jobs");
    const jobs = Array.isArray(existing) ? existing : [];

    const updatedJobs = jobs.filter((job: any) => job.id !== id);

    await redis.set("jobs", updatedJobs);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json(
      { error: "Failed to delete job" },
      { status: 500 }
    );
  }
}