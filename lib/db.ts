import "server-only";
import { Pool } from "pg";

const globalForDb = globalThis as unknown as { dbPool?: Pool };

export function getDb(): Pool {
  if (!globalForDb.dbPool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL fehlt. Bitte .env.local konfigurieren.");
    }

    const pool = new Pool({
      connectionString,
      max: 10,
      connectionTimeoutMillis: 5000,
      idleTimeoutMillis: 30000,
    });
    pool.on("error", (error) => {
      console.error("PostgreSQL: Fehler einer ungenutzten Verbindung", error.message);
    });
    globalForDb.dbPool = pool;
  }

  return globalForDb.dbPool;
}
