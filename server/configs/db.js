import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let connectionString;
const {
  DEV_DATABASE_URL,
  PROD_DATABASE_URL,
  TEST_DATABASE_URL,
} = process.env;

if (process.env.NODE_ENV === 'test') {
  connectionString = TEST_DATABASE_URL;
} else if (process.env.NODE_ENV === 'production') {
  connectionString = PROD_DATABASE_URL;
} else {
  connectionString = DEV_DATABASE_URL;
}

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
};

mongoose.connect(connectionString, options);

const db = mongoose.connection;

export default db;
