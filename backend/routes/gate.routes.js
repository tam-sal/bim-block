import { Router } from 'express';

const gate = Router();

gate.get('/', (req, res) => {
  return res.status(200).json({ success: 'Blocks API is up and running' })
});

export default gate;