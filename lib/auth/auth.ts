import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { initializeUserBoard } from "../init-user-board";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || "job-board";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

// Keep one client across Next.js development reloads. Recreating the client
// for every module evaluation can leave Better Auth holding a closed topology.
const globalForAuth = globalThis as typeof globalThis & {
  betterAuthMongoClient?: MongoClient;
};

const client =
  globalForAuth.betterAuthMongoClient ??
  new MongoClient(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
  });

if (process.env.NODE_ENV !== "production") {
  globalForAuth.betterAuthMongoClient = client;
}

const db = client.db(MONGODB_DB_NAME);

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: mongodbAdapter(db, {
    client,
  }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          if (user.id) {
            await initializeUserBoard(user.id);
          }
        },
      },
    },
  },
});

export async function getSession() {
  try {
    return await auth.api.getSession({
      headers: await headers(),
    });
  } catch (error) {
    // A database outage should behave like an unauthenticated request instead
    // of turning every page request into a Next.js internal server error.
    console.error("Unable to load the current session:", error);
    return null;
  }
}

export async function signOut() {
  const result = await auth.api.signOut({
    headers: await headers(),
  });

  if (result.success) {
    redirect("/sign-in");
  }
}
