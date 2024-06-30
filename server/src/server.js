require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { connectMongo } = require('./utils/database');
const initRouters = require('./routes/index.route');
const { responseError } = require('./utils/response');
const { PORT = 5000 } = process.env;

const server = express();

connectMongo();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

initRouters(server);


server.use(function (err, req, res, next) {
  responseError(res, err);
});

server.listen(PORT, () => {
  console.log('API listening on port ---> ' + PORT);
});
