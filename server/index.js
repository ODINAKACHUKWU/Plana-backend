import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import db from './configs/db';
import baseRouter from './routes';
import http from './helpers/http';
import swaggerDoc from '../swagger.json';

const app = express();
const port = process.env.PORT || 3000;
const isTest = process.env.NODE_ENV === 'test';
const { httpResponse } = http;

app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/api/v1', baseRouter);

app.get('/', (req, res) => {
  res.send(`<h1>Welcome to Plana</h1>
            <h3>Plana is a task management solution that helps users to manage todo lists.</h3>
            <p>For any more information please visit our
            <a href='https://github.com/ODINAKACHUKWU/Plana-backend'>
            Github repo!</a></p>
            <h4>Thank you for visiting  &#x1F600;</h4>
            `);
});

app.get('/api/v1', (req, res) => httpResponse(res, {
  statusCode: 200,
  success: true,
  message: 'Connected to Plana v1 API',
}));

app.get('*', (req, res) => httpResponse(res, {
  statusCode: 404,
  success: false,
  message: 'Not found',
}));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}...`);
});

db.on(
  'error',
  // eslint-disable-next-line no-console
  console.error.bind(
    console,
    'Database connection error:',
  ),
);

if (!isTest) {
  db.once('open', () => {
    // eslint-disable-next-line no-console
    console.log('Database connected...');
  });
}

export default app;
