import mysql2 from "mysql2/promise";

export const pool = mysql2.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "notes_app",
});

export const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    connection.release();
    console.log("Database connected successfully!");
  } catch (err) {
    console.error("Database connection failed");
  }
};
