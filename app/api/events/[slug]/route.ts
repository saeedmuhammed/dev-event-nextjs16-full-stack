import { NextResponse } from "next/server";
import Event from "@/lib/database/event.model";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const event = await Event.findOne({ slug }).lean();

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const serializedEvent = JSON.parse(JSON.stringify(event));

    return NextResponse.json(serializedEvent, { status: 200 });
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
