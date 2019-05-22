// import express from 'express';
const express = require('express');
const logger = require('morgan');

const app = express();
const port = process.env.PORT || 3000

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

app.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
});
