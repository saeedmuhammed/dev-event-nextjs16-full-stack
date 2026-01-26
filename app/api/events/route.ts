import Event from "@/lib/database/event.model";
import { dbConnect } from "@/lib/dbConnenction";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const data = await req.formData();
    console.log("Form Data:xx", data);
    let event;
    try {
      event = Object.fromEntries(data.entries());
      console.log(event, "eventData");
    } catch {
      return NextResponse.json(
        { message: "Invalid form data" },
        { status: 400 },
      );
    }
    const sanitizedEvent = {
      ...event,
      mode: (event.mode as string)?.trim().toLowerCase(),
      agenda: typeof event.agenda === "string" ? [event.agenda] : event.agenda,
      tags: typeof event.tags === "string" ? [event.tags] : event.tags,
    };

    const createdEvent = await Event.create(sanitizedEvent);

    return NextResponse.json(
      { message: "Event created successfully", event: createdEvent },
      { status: 201 },
    );
  } catch (e) {
    return NextResponse.json(
      {
        message: "Failed to create event",
        error: e instanceof Error ? e.message : String(e),
      },
      { status: 500 },
    );
  }
}
