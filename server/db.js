const { Pool } = require('pg');
require('dotenv').config();

// Support both Railway's DATABASE_URL and individual env vars
const pool = new Pool(
    process.env.DATABASE_URL
        ? {
              connectionString: process.env.DATABASE_URL,
              ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
          }
        : {
              user: process.env.DB_USER || 'postgres',
              host: process.env.DB_HOST || 'localhost',
              database: process.env.DB_NAME || 'nabhacare',
              password: process.env.DB_PASSWORD || 'password',
              port: process.env.DB_PORT || 5432,
          }
);

// Test database connection
pool.on('connect', () => {
    console.log('✅ Database connected successfully');
});

pool.on('error', (err) => {
    console.error('❌ Unexpected database error:', err);
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
