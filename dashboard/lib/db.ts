import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;

export const sql =
  databaseUrl
    ? neon(databaseUrl)
    : (async () => {
        throw new Error("DATABASE_URL is not set");
      }) as unknown as ReturnType<typeof neon>;
