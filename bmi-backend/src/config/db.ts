import sql from 'mssql';

const config = {
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || '123456',
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_NAME || 'BMIHuman',
  port: 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

export const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool: any) => {
    console.log('Connected to SQL Server');
    return pool;
  })
  .catch((err: any) => console.log('Database Connection Failed! Bad Config: ', err));   