import { Router } from 'express';
import { getBudgets } from './controller';

const router = Router();

router.get('/', getBudgets);
// ...other routes...

export default router;