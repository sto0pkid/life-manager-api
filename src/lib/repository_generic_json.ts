import {v4 as newId} from 'uuid'

export class Repository<T> {
    data : {[key:string] : T & {id : string}}

    constructor(data : {[key:string] : T & {id : string}}){
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
    add(data : T){
        const id = newId()
        this.data[id] = {
            ...data,
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

    update(id : string, data : T ){
        if(!(id in this.data)){
            throw new Error('NOT_FOUND')
        }
        this.data[id] = {
            ...data,
            id
        }
    }
}