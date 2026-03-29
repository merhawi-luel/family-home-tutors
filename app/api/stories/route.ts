import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

// --- GET STORIES ---
export async function GET() {
  try {
    const stories = await redis.get("stories");
    return NextResponse.json(Array.isArray(stories) ? stories : []);
  } catch (err) {
    console.error("GET stories error:", err);
    return NextResponse.json([], { status: 500 });
  }
}

// --- ADD STORY ---
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const existing = await redis.get("stories");
    const stories = Array.isArray(existing) ? existing : [];

    const newStory = {
      ...body,
      id: Date.now(),
    };

    const updatedStories = [newStory, ...stories];

    await redis.set("stories", updatedStories);

    return NextResponse.json(newStory);
  } catch (err: any) {
    console.error("POST stories error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to add story" },
      { status: 500 }
    );
  }
}

// --- DELETE STORY ---
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    const existing = await redis.get("stories");
    const stories = Array.isArray(existing) ? existing : [];

    const updatedStories = stories.filter((s: any) => s.id !== id);

    await redis.set("stories", updatedStories);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE stories error:", err);
    return NextResponse.json(
      { error: "Failed to delete story" },
      { status: 500 }
    );
  }
}