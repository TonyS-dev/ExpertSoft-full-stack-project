// backend/models/db_connection.js
import dotenv from "dotenv";
import mysql from "mysql2/promise"

dotenv.config();  // loads environment variables

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionLimit: 10,        // Maximum number of active connections at the same time
    waitForConnections: true,   // If the limit is reached, new requests wait their turn
    queueLimit: 0               // Maximum number of pending requests (0 = unlimited)
})


async function testDBConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Successful database connection');
        connection.release();
    } catch (error) {
        console.error('❌ Error connecting to the database:', error.message);
    }
}