"use server";

import Booking from "../database/booking.model";
import { dbConnect } from "../dbConnenction";

export const bookingAction = async (eventId: string, email: string) => {
  try {
    await dbConnect();
    await Booking.create({ eventId, email });
    return { success: true };
  } catch {
    return { success: false };
  }
};
