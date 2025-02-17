import { Bill, BillData } from './types'
export interface BillsRepository {
    data : {[key:string] : Bill}
    constructor : Function,
    list : () => {[key:string] : Bill},
    get: (id : string) => Bill,
    add: (bill : BillData) => Bill,
    remove: (id : string) => void,
    update: (id : string, bill : BillData ) => void
}