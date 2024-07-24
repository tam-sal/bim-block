import { Router } from 'express';
import { createBlock, getUserBlocks, updateUserBlock, deleteBlock } from '../controllers/block.controller.js';
import protect from '../middlewares/protect.middleware.js';

const block = Router();

block.post('/', [protect], createBlock);
block.get('/', [protect], getUserBlocks);
block.put('/:id', [protect], updateUserBlock);
block.delete('/:id', [protect], deleteBlock);


export default block;