// db.js

import postgresql from "pg";

const { Pool } = postgresql;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Bitirme_Proje",
  password: "123456",
  port: 5432,
});

async function checkConnection() {
  try {
    const client = await pool.connect();
    client.release();
    return true; // Connection is successful
  } catch (error) {
    console.error("Error checking PostgreSQL connection:", error.stack);
    return false; // Connection failed
  }
}

export { checkConnection , pool};
