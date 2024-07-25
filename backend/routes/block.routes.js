import { Router } from 'express';
import { createBlock, getUserBlocks, updateUserBlock, deleteBlock } from '../controllers/block.controller.js';
import protect from '../middlewares/protect.middleware.js';

const block = Router();

/**
 * @swagger
 * tags:
 *   name: Blocks
 *   description: Operations related to blocks
 */

/**
 * @swagger
 * /blocks:
 *   post:
 *     summary: Create a new block
 *     tags: [Blocks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: Description of the block
 *                 example: New Block Description
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Start date of the block
 *                 example: 2024-07-01
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: End date of the block
 *                 example: 2024-07-31
 *               progress:
 *                 type: integer
 *                 description: Progress of the block
 *                 example: 50
 *     responses:
 *       201:
 *         description: Block created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: Block has been successfully created
 *       400:
 *         description: Bad request
 *       409:
 *         description: Conflict - Duplicate block description
 */
block.post('/', [protect], createBlock);

/**
 * @swagger
 * /blocks:
 *   get:
 *     summary: Get all user blocks
 *     tags: [Blocks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user blocks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 blocks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: 60c72b2f5f1b2c001f4c1a4e
 *                       description:
 *                         type: string
 *                         example: New Block Description
 *                       startDate:
 *                         type: string
 *                         format: date
 *                         example: 2024-07-01
 *                       endDate:
 *                         type: string
 *                         format: date
 *                         example: 2024-07-31
 *                       progress:
 *                         type: integer
 *                         example: 50
 *       500:
 *         description: Server error
 */
block.get('/', [protect], getUserBlocks);

/**
 * @swagger
 * /blocks/{id}:
 *   put:
 *     summary: Update a block
 *     tags: [Blocks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the block to update
 *         schema:
 *           type: string
 *           example: 60c72b2f5f1b2c001f4c1a4e
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Updated start date of the block
 *                 example: 2024-07-01
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: Updated end date of the block
 *                 example: 2024-07-31
 *               progress:
 *                 type: integer
 *                 description: Updated progress of the block
 *                 example: 75
 *     responses:
 *       200:
 *         description: Block updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: Block has been successfully updated
 *                 updatedBlock:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 60c72b2f5f1b2c001f4c1a4e
 *                     description:
 *                       type: string
 *                       example: Updated Block Description
 *                     startDate:
 *                       type: string
 *                       format: date
 *                       example: 2024-07-01
 *                     endDate:
 *                       type: string
 *                       format: date
 *                       example: 2024-07-31
 *                     progress:
 *                       type: integer
 *                       example: 75
 *       400:
 *         description: Bad request
 *       404:
 *         description: Block not found
 *       500:
 *         description: Server error
 */
block.put('/:id', [protect], updateUserBlock);

/**
 * @swagger
 * /blocks/{id}:
 *   delete:
 *     summary: Delete a block
 *     tags: [Blocks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the block to delete
 *         schema:
 *           type: string
 *           example: 60c72b2f5f1b2c001f4c1a4e
 *     responses:
 *       200:
 *         description: Block deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: Block successfully deleted
 *                 block:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 60c72b2f5f1b2c001f4c1a4e
 *                     description:
 *                       type: string
 *                       example: Block Description
 *                     startDate:
 *                       type: string
 *                       format: date
 *                       example: 2024-07-01
 *                     endDate:
 *                       type: string
 *                       format: date
 *                       example: 2024-07-31
 *                     progress:
 *                       type: integer
 *                       example: 50
 *       404:
 *         description: Block not found
 *       500:
 *         description: Server error
 */
block.delete('/:id', [protect], deleteBlock);


export default block;