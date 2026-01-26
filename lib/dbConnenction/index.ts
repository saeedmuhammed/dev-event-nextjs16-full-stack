import mongoose from "mongoose";

type mongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongooseCache: mongooseCache | undefined;
}

const MONGODB_URL = process.env.MONGODB_URL || "";

if (!MONGODB_URL) {
  throw new Error("Please define the MONGODB_URL environment variable");
}

const mongooseCache: mongooseCache = global.mongooseCache || {
  conn: null,
  promise: null,
};
export async function dbConnect() {
  if (mongooseCache.conn) {
    return mongooseCache.conn;
  }
  if (!mongooseCache.promise) {
    if (!MONGODB_URL) {
      throw new Error("Please define the MONGODB_URL environment variable");
    }

    const opts = {
      bufferCommands: false,
    };
    mongooseCache.promise = mongoose
      .connect(MONGODB_URL, opts)
      .then((mongoose) => {
        return mongoose;
      });
  }
  try {
    mongooseCache.conn = await mongooseCache.promise;
  } catch (e) {
    console.log(e, "e saeed");
    mongooseCache.promise = null;
    throw e;
  }
  return mongooseCache.conn;
}
