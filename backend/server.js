import express from 'express';
import connectDB from './database/connect.db.js';
import connectApp from './config/connectApp.js';



const { NODE_ENV, DEV_PORT, PROD_PORT } = process.env;
const PORT = NODE_ENV === 'production' ? PROD_PORT : DEV_PORT;
const app = express();



connectApp(app, connectDB, PORT);



