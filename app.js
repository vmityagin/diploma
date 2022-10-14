require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const limiter = require('./middlewares/rateLimiter');
const router = require('./routes/routes');
const { errorsCheck } = require('./middlewares/errors');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const { mongoUri } = require('./constants/constants');

const { MONGO_URI, NODE_ENV } = process.env;

const app = express();
app.use(helmet());
app.use(cors());

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(NODE_ENV === 'production' ? MONGO_URI : mongoUri, {
  useNewUrlParser: true, useUnifiedTopology: true,
});

app.use(requestLogger);
app.use(limiter);
app.use(router);
app.use(errorLogger);

app.use(errors());

app.use(errorsCheck);

module.exports = app;
