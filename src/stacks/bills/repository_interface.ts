import { Bill, BillData } from './types.js'
export interface BillsRepository {
    data : {[key:string] : Bill}
    constructor : Function,
    list : () => {[key:string] : Bill},
    get: (id : string) => Bill | undefined,
    add: (bill : BillData) => Bill | undefined,
    remove: (id : string) => void,
    update: (id : string, bill : BillData ) => void
}