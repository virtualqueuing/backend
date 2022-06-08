require('dotenv').config();
require('express-async-errors');
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const connectDB = require('./db/connect');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const swaggerJsDoc = require('./utils/swagger');

const v1Router = require('./routes');

const app = express();

app.use(express.json());
// extra security package
app.use(helmet());
app.use(cors());
app.use(xss());

app.use(express.urlencoded({extended:false}));

// routes
app.use('/v1', v1Router);

// health check api
app.get('/healthcheck', (request, response) => response.status(200).send({ message: 'healthy' }));

app.get('/queue',(req,res)=>res.status(200).send({queue}));
app.post("/queue",(req,res) => {
  console.log(req.body);
  const user = req.body;
  users.push(queue);
  res.status(201).send('Created Customer')
});

const queue = [
  {state:'completed',name:'Anson', phone:'0422123456',people:3,tableType:'medium',others:"We need baby chair,please.Thanks!"},
  {state:'waiting',name:'Kelvin', phone:'0422223456',people:5,tableType:'large'},
  {state:'absent',name:'Michelle', phone:'0422788969',people:8,tableType:'large'}
]

const testQueue = [
  {state:'completed',name:'Asherly', phone:'0422123456',people:3,tableType:'medium',others:"We need baby chair,please.Thanks!"},
  {state:'waiting',name:'Rouran', phone:'0422223456',people:5,tableType:'large'},
  {state:'absent',name:'Mike', phone:'0422788969',people:8,tableType:'large'}
]

//June 7th, Stephy's code-start// get('/:state',
app.get('/testQueue',(req,res)=>res.status(200).send({testQueue}));
app.get('/:state',(req,res)=>res.status(200).send({data}));


// swagger api docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc));

// error handler
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // await connectDB(process.env.LOCAL_STRING);
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
