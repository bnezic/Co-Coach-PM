import nextEnv from "@next/env";
import pg from "pg";

nextEnv.loadEnvConfig(process.cwd(), true);

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL fehlt. Bitte .env.local konfigurieren.");
}

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 5000,
});

try {
  const { rows } = await pool.query(
    "SELECT current_database() AS database, current_user AS username, now() AS time",
  );
  console.log("PostgreSQL-Verbindung erfolgreich:", rows[0]);
} catch (error) {
  console.error("PostgreSQL-Verbindung fehlgeschlagen:", error.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
