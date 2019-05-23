import express from 'express';
import logger from 'morgan';

const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));

app.get('/', (req, res) => {
  res.send(`<h1>Welcome to Plana</h1>
            <h3>Plana is a task management solution that helps users to manage todo lists.</h3>
            <p>For any more information please visit our
            <a href='https://github.com/ODINAKACHUKWU/Plana-backend'>
            Github repo!</a></p>
            <h4>Thank you for visiting  &#x1F600;</h4>
            `);
});

app.get('/api/v1', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Connected to Plana v1 API',
  });
});

app.get('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Not found',
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});

export default app;
