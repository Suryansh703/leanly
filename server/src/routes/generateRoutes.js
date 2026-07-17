import { Router } from 'express';
import { generate } from '../controllers/generateController.js';
const router = Router();
router.post('/generate', generate);
export default router;
