import { Router } from 'express';

const gate = Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health Check]
 *     responses:
 *       200:
 *         description: The API is up and running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: Blocks API is up and running
 */
gate.get('/', (req, res) => {
  return res.status(200).json({ success: 'Blocks API is up and running' })
});

export default gate;