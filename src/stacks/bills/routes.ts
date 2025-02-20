import { Router } from 'express';
import { BillsController } from './controller.js';
import { Repository } from './repository_json.js'
import { Bill } from './types.js'

const billsData : {[key:string] : Bill} = {}
const repository = new Repository(billsData)
const controller = new BillsController(repository)

const router = Router();

router.get('/', controller.list.bind(controller));
router.get('/:id', controller.get.bind(controller));
router.post('/', controller.add.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.remove.bind(controller));

export default router;