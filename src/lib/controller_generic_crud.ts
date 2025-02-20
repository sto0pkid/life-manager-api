import { Request, Response } from 'express';

interface IRepository<T> {
    data : {[key:string] : T & {id : string}}
    constructor : Function,
    list : () => {[key:string] : T & {id : string}},
    get: (id : string) => T & {id : string} | undefined,
    add: (bill : T) => T & {id : string} | undefined,
    remove: (id : string) => void,
    update: (id : string, bill : T ) => void
}

export interface IControllerGeneric<T> {
    constructor : Function
    list : (req : Request, res : Response) => void
    get : (req : Request, res : Response) => void
    add : (req : Request, res : Response) => void
    remove : (req : Request, res : Response) => void
    update : (req : Request, res : Response) => void

}

export class ControllerGeneric<T> {
    private repo : IRepository<T>
    constructor(repo : IRepository<T>) {
        this.repo = repo
    }
    async list(req : Request, res : Response){
        try {
            const items = this.repo.list();
            res.json(items);
        } catch (error : unknown) {
            if(error instanceof Error){
                res.status(500).json({ message: error.message });
            } else {
                throw error
            }
        }
        return
    }
    async get(req : Request, res : Response){
        try {
            if(typeof req.params.id === 'undefined'){
                throw new Error('INVALID')
            }
            const item = this.repo.get(req.params.id)
            res.json(item)
        } catch (error : unknown) {
            if(error instanceof Error ){
                res.status(500).json({message: error.message})
            } else {
                throw error
            }

        }
        return
    }
    async add(req : Request, res : Response){
        try {
            const itemData = req.body
            const item = this.repo.add(itemData)
            res.json(item)
        } catch (error : unknown) {
            if(error instanceof Error){
                res.status(500).json({message: error.message})
            } else {
                throw error
            }
        }
        return
    }

    async remove(req : Request, res : Response){
        try {
            if(typeof req.params.id === 'undefined'){
                throw new Error('INVALID')
            }
            const id = req.params.id
            this.repo.remove(id)
        } catch (error : unknown ){
            if(error instanceof Error){
                res.status(500).json({message: error.message})
            } else {
                throw error
            }
        }
        return
    }

    async update(req : Request, res : Response){
        try {
            if(typeof req.params.id === 'undefined'){
                throw new Error('INVALID')
            }
            const id = req.params.id
            const data = req.body
            this.repo.update(id, data)
        } catch (error : unknown){
            if(error instanceof Error){
                res.status(500).json({message: error.message})
            } else {
                throw error
            }
        }
        return
    }
}