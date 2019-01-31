import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


export default {
  query: (queryString, params, callback) => {
    return pool.query(queryString, params, callback);
  },
};
