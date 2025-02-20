import { Router } from 'express';
import { GoalsController } from './controller.js';
import { Repository } from './repository_json.js'
import { Goal } from './types.js'

const goalsData : {[key:string] : Goal} = {}
const repository = new Repository(goalsData)
const controller = new GoalsController(repository)

const router = Router();

router.get('/', controller.list.bind(controller));
router.get('/:id', controller.get.bind(controller));
router.post('/', controller.add.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.remove.bind(controller));
router.get('/:id/dependencies/', controller.listDependencies.bind(controller))
router.get('/:id/dependencies/:dependencyId', controller.getDependency.bind(controller))
router.post('/:id/dependencies/:dependencyId', controller.addDependency.bind(controller))
router.put('/:id/dependencies/:dependencyId', controller.updateDependency.bind(controller))
router.delete('/:id/dependencies/:dependencyId', controller.removeDependency.bind(controller))

export default router;