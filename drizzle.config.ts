import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./app/schema.server.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
  verbose: true,
  strict: true,
});
