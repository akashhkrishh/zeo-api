import { Pool } from 'pg';

// Create a new connection pool using the PostgreSQL URL stored in the environment variable
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Use the DATABASE_URL environment variable
  ssl: process.env.DATABASE_URL?.startsWith("postgres://") ? { rejectUnauthorized: false } : false, // Optional: add SSL if required
});

export default pool;
