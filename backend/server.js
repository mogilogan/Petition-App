const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv')

//import routes
const loginRouter = require("./routes/loginRouter.js");

//config dotenv
dotenv.config({ path: './config/config.env' })

//set ports
const PORT = process.env.PORT || 5000

//initialize express app
const app = express();


//body parser the incoming request
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

//allow cross domain requests
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

//use routes
app.use("/", loginRouter);


//make app listen to port 5000
app.listen(PORT, () => {
  console.log(
    `Running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
})