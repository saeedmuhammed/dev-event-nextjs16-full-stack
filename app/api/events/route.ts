import Event from "@/lib/database/event.model";
import { dbConnect } from "@/lib/dbConnenction";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const data = await req.formData();
    let event;
    try {
      event = Object.fromEntries(data.entries());
    } catch {
      return NextResponse.json(
        { message: "Invalid form data" },
        { status: 400 },
      );
    }
    const sanitizedEvent = {
      ...event,
      mode: (event.mode as string)?.trim().toLowerCase(),
      agenda:
        typeof event.agenda === "string"
          ? [event.agenda]
          : Array.isArray(event.agenda)
            ? (event.agenda as string[])
            : [],
      image: "",
      tags:
        typeof event.tags === "string"
          ? [event.tags]
          : Array.isArray(event.tags)
            ? (event.tags as unknown as string[])
            : [],
    };

    const file = data.get("image") as File | null;
    const arrayBuffer = file ? await file.arrayBuffer() : null;
    if (arrayBuffer) {
      const buffer = Buffer.from(arrayBuffer);
      const uploadResults = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "image",
              folder: "devEvents",
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            },
          )
          .end(buffer);
      });
      sanitizedEvent.image = (
        uploadResults as { secure_url: string }
      ).secure_url;
    }

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

export async function GET() {
  try {
    await dbConnect();
    const events = await Event.find().sort({ createdAt: -1 });
    return NextResponse.json({ events }, { status: 200 });
  } catch (e) {
    return NextResponse.json({
      message: "Failed to fetch events",
      error: e instanceof Error ? e.message : String(e),
    });
  }
}
