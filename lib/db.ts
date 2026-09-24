import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || "job-board";


interface Mongoosecashe {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    var mongoose: Mongoosecashe | undefined;
}

const cached: Mongoosecashe = global.mongoose || {conn: null, promise: null};

if (!global.mongoose){
    global.mongoose = cached;
}

async function connectDB(){
    if (!MONGODB_URI) {
    throw new Error(
        "please define the MONGODB_URI environment variable inside.env"
    );
}

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
      dbName: MONGODB_DB_NAME,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;

}

export default connectDB;
