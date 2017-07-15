/* eslint-disable */
/* eslint-env node */

import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import dotenv from 'dotenv';
import http from 'http';

import config from './config/database'; // get db config file
import {isAuthenticate, Strategy} from './middleware/authenticate'

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;
mongoose.connect(config.database);
mongoose.connection.on('error', (err) => {
    console.error(err);
    console.log('MongoDB connection error. Please make sure MongoDB is running.');
    process.exit();
});

import index from './routes/index';
import users from './routes/users';
import api from './routes/api';
import socketIo from './socket/socket';


let app = express();

/**
 * Create HTTP server.
 */
var server = http.createServer(app);

/**
  * Config socket.io
  */
let handlerSocket = new socketIo(server);

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({path: '.env'});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// Use the passport package in our application
app.use(passport.initialize());
// pass passport for configuration

Strategy(passport);

//ROUTES
app.use('/', index);
app.use('/users', users);
app.use('/api', isAuthenticate, api)


module.exports = {app, server};