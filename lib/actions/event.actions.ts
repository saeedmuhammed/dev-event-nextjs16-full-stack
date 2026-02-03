"use server";

import Event from "../database/event.model";
import { dbConnect } from "../dbConnenction";

export const getSimilarEventsBySlug = async (slug: string) => {
  try {
    await dbConnect();
    const event = await Event.findOne({ slug });
    if (!event) {
      return [];
    }
    return await Event.find({
      _id: { $ne: event.id },
      tags: { $in: event.tags },
    })
      .limit(3)
      .lean();
  } catch {
    return [];
  }
};
