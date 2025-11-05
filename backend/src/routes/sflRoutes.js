import { Router } from 'express';
import sflDiggingData from '../controllers/sflData.js';
import sflPatterns from '../controllers/sflPatterns.js';

const router = Router();

router.get('/:id', sflDiggingData.digging);
router.get('/patterns/:id', sflPatterns.patterns);

export default router;