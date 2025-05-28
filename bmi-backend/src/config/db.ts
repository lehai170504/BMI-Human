import sql from "mssql";
import dotenv from "dotenv";
import { AppError } from "../middleware/errorHandler";

dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['DB_USER', 'DB_PASS', 'DB_HOST', 'DB_PORT', 'DB_NAME'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  throw new AppError(
    `Missing required environment variables: ${missingEnvVars.join(', ')}`,
    500
  );
}

const config: sql.config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_HOST!,
  port: parseInt(process.env.DB_PORT!),
  database: process.env.DB_NAME,
  options: {
    encrypt: false, // set false nếu dev local, true nếu deploy Azure
    trustServerCertificate: true, // true để tránh lỗi cert trên local
    enableArithAbort: true
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

export const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log("Connected to SQL Server");
    return pool;
  })
  .catch(err => {
    console.error("Database Connection Failed!", err);
    throw new AppError(
      `Database connection failed: ${err.message}`,
      500
    );
  });
