require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const routers = require('./routes/index');
const errorsHandler = require('./middlewares/errorsHandler');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, NODE_ENV } = process.env;

const app = express();
mongoose.connect('mongodb://127.0.0.1/mestodb');
app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(cors);
app.use(routers);
app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`App listening in ${NODE_ENV || 'develop'} mode at port ${PORT}`);
});
