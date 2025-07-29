import { Router } from 'express';
import sflDiggingData from '../controllers/sflData.js';

const router = Router();

router.get('/:id', sflDiggingData.digging);

export default router;