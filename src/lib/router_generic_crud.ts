import { Router } from 'express';
import { IControllerGeneric } from './controller_generic_crud';

export function CRUDRouter<T>(controller : IControllerGeneric<T>){
    const router = Router();
    
    router.get('/', controller.list.bind(controller));
    router.get('/:id', controller.get.bind(controller));
    router.post('/', controller.add.bind(controller));
    router.put('/:id', controller.update.bind(controller));
    router.delete('/:id', controller.remove.bind(controller));
    
    return router;
}