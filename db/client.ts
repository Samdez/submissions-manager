// import { drizzle } from "drizzle-orm/libsql";
import { drizzle } from "drizzle-orm/postgres-js";
import "dotenv/config";

import { createClient } from "@libsql/client";
import * as schema from "@/db/schema";
import postgres from "postgres";

// const client = createClient({
//   url: process.env.DATABASE_URL!,
//   authToken: process.env.DATABASE_AUTH_TOKEN,
// });
const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client);

// export const db = drizzle(client, { schema, logger: true });
