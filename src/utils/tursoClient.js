import { createClient } from "@libsql/client";

export const tursoClient = createClient({
  url: process.env.NEXT_PUBLIC_DB_URL,
  authToken: process.env.NEXT_PUBLIC_DB_AUTH_TOKEN
});