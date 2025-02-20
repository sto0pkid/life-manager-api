import { Repository } from './repository_generic_json.js'
import { ControllerGeneric } from './controller_generic_crud.js'
import { CRUDRouter } from './router_generic_crud.js';

export default function crudApi<T>(){
    const eventsData : {[key:string] : T & { id : string}} = {}
    const repository = new Repository<T>(eventsData)
    const controller = new ControllerGeneric<T>(repository)
    return CRUDRouter<T>(controller)
}