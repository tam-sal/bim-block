import express from 'express';
import connectDB from './database/connect.db.js';
import connectApp from './config/connectApp.js';

const app = express();


const { NODE_ENV, DEV_PORT, PROD_PORT } = process.env;
const PORT = NODE_ENV === 'production' ? PROD_PORT : DEV_PORT;
connectApp(app, connectDB, PORT);



