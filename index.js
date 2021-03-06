const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const postRouter = require('./routes/postRoutes')

//for defining enviroment variables
dotenv.config({
  path: './config.env',
});

const app = express()

// middleware - function that can modify incoming data
// middle -- between the request and the response
// to put body object in request (req.body to be available)
//Body parser
//* when we have body larger than 10kb basically not be accepted
app.use(express.json({ limit: '10kb' }));


app.use('/post', postRouter)
// app.use('/user', userRouter)

app.use('/', (req, res, next) => {
  res.send('Use /post instead of /')
})

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'))

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});