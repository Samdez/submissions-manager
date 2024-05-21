import { Config, defineConfig } from "drizzle-kit";
import dotenv from "dotenv";
import "dotenv/config";

// export default defineConfig({
//   schema: "./db/schema.ts",
//   dialect: "sqlite",
//   driver: "turso",
//   dbCredentials: {
//     url: process.env.DATABASE_URL!,
//     authToken: process.env.DATABASE_AUTH_TOKEN,
//   },
//   verbose: true,
//   strict: true,
// }) satisfies Config;

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./supabase/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
