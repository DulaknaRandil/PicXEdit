import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL: string | undefined = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Ensure global cache for the connection (fixes ESLint `any` issue)
declare global {
  var mongoose: MongooseConnection | undefined;
}

let cached: MongooseConnection = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

export const connectToDatabase = async (): Promise<Mongoose> => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URL) {
    throw new Error("MONGODB_URL is missing");
  }

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: "picxedit",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;
  return cached.conn;
};
