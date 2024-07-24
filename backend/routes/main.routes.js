import { Router } from 'express';
import gate from './gate.routes.js';
import auth from './auth.routes.js';
import block from './block.routes.js';

const appRouter = Router();
appRouter.use('/', gate);
appRouter.use('/auth', auth);
appRouter.use('/blocks', block);



appRouter.use('*', (req, res) => {
  res.status(404).json({
    error: error.message,
    message: 'Invalid endpoint'
  });
});

export default appRouter;