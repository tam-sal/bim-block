import cookieParser from 'cookie-parser';
import express from 'express';
import appRouter from '../routes/main.routes.js';
import cors from 'cors';


let _cors = {
  origin: 'http://localhost:3001/',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: 'Content-Type,Authorization'
};

// Once the front is deployed - this is used
const options = process.env.NODE_ENV === 'production' ? _cors.origin = process.env.front : _cors.origin;

const middlewares = [
  cors({ origin: true }),
  express.json(),
  cookieParser(),
  appRouter
];

export default middlewares;

