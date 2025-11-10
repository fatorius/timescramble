import { Pool } from "pg";

const pool = new Pool({
  user: process.env.NEXT_PUBLIC_DB_USERNAME,
  host: process.env.NEXT_PUBLIC_DB_HOST,
  database: process.env.NEXT_PUBLIC_DB_NAME,
  password: process.env.NEXT_PUBLIC_DB_PASS,
  port: Number(process.env.NEXT_PUBLIC_DB_PORT),
});

export async function GET() {
  const result = await pool.query(
    "SELECT * FROM positions OFFSET floor(random() * (SELECT COUNT(*) FROM positions)) LIMIT 1;"
  );
  return Response.json(result.rows[0]);
}
