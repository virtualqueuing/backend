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
const { application } = require('express');

const app = express();

// --Stephy's code start--//
app.use(express.urlencoded({extended:false}));
// --Stephy's code end--//

app.use(express.json());
// extra security package
app.use(helmet());
app.use(cors());
app.use(xss());

// routes
app.use('/v1', v1Router);

// health check api
app.get('/healthcheck', (request, response) => response.status(200).send({ message: 'healthy' }));

// ----Stephy's code ---start//
app.get('/users',(req,res)=>res.status(200).send({users}));
app.post("/users",(req,res) => {
  console.log(req.body);
  const user = req.body;
  users.push(user);
  res.status(201).send('Created User')
});
// ----Stephy's code ---end//

// swagger api docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc));

// error handler
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//----Stephy's code start--//
const users = [
  {name:'Anson', phone:'0422123456',people:3,tableType:'medium',others:"We need baby chair,please.Thanks!"},
  {name:'Kelvin', phone:'0422223456',people:5,tableType:'large'},
  {name:'Michelle', phone:'0422788969',people:8,tableType:'large'}
]
//----Stephy's code end--//
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
