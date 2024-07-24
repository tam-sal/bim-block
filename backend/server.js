import express from 'express';
import connectDB from './database/connect.db.js';
import connectApp from './config/connectApp.js';
import middlewares from './middlewares/app.middlewares.js';



const { NODE_ENV, DEV_PORT, PROD_PORT } = process.env;
const PORT = NODE_ENV === 'production' ? PROD_PORT : DEV_PORT;
const app = express();
middlewares.forEach(middleware => app.use(middleware))
connectApp(app, connectDB, PORT);



