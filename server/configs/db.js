import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let connectionString;
const {
  NODE_ENV,
  DEV_DATABASE_URL,
  PROD_DATABASE_URL,
  TEST_DATABASE_URL,
} = process.env;

if (NODE_ENV === 'test') {
  connectionString = TEST_DATABASE_URL;
} else if (NODE_ENV === 'production') {
  connectionString = PROD_DATABASE_URL;
} else {
  connectionString = DEV_DATABASE_URL;
}

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
};

mongoose.connect(`${connectionString}`, options, () => {
  // eslint-disable-next-line no-console
  console.log('Database connected!');
});

export default mongoose;
