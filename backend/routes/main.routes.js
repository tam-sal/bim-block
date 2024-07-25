import { Router } from 'express';
import gate from './gate.routes.js';
import auth from './auth.routes.js';
import block from './block.routes.js';
import swaggerSpec from '../swaggerConfig.js';
import swaggerUi from 'swagger-ui-express';

const appRouter = Router();


appRouter.use('/', gate);
appRouter.use('/auth', auth);
appRouter.use('/blocks', block);
appRouter.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

appRouter.use('*', (req, res) => {
  return res.status(404).json({
    message: 'Invalid endpoint'
  });
});

export default appRouter;