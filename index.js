const express = require('express')
const app = express();
const port = 8000;
const { error } = require('console');
const userRouter = require('./routes/user')
const {mongoConnect} = require('./connection')
const {logreqres} = require('./middlewares/index')

// connection
mongoConnect('mongodb://127.0.0.1:27017/first-node-app');


// middleware -plugin
app.use(express.urlencoded({ extended: false })); 
app.use(express.json()); 

app.use(logreqres('log.txt'));



app.listen(8000, () => {
  console.log(`server is running at ${port}`);
});


// routes
app.use("/users",userRouter);
