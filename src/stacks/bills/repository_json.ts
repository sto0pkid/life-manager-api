import {v4 as newId} from 'uuid'
import { Bill, BillData } from './types.js'

export class Repository {
    data : {[key:string] : Bill}

    constructor(data : {[key:string] : Bill}){
        this.data = data
    }

    list(){
        return this.data
    }

    get(id : string){
        if(!(id in this.data)){
            throw new Error('NOT_FOUND')
        }
        return this.data[id]
    }
    add(bill : BillData){
        const id = newId()
        this.data[id] = {
            ...bill,
            id
        }
        return this.data[id]
    }

    remove(id : string){
        if(!(id in this.data)){
            throw new Error('NOT_FOUND')
        }
        delete this.data[id]
    }

    update(id : string, bill : BillData ){
        if(!(id in this.data)){
            throw new Error('NOT_FOUND')
        }
        this.data[id] = {
            ...bill,
            id
        }
    }
}