import mysql from "mysql2/promise";

const db = await mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Keertan@123",
  database: "hrmsDB",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

console.log(" db connected ");
export default db;
