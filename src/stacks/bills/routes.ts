import { Router } from 'express';
import { BillsController } from './controller';
import { Repository } from './repository_json'
import { Bill } from './types'

const billsData : {[key:string] : Bill} = {}
const repository = new Repository(billsData)
const controller = new BillsController(repository)

const router = Router();

router.get('/', controller.list);
router.get('/:id', controller.get);
router.post('/', controller.add);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

export default router;