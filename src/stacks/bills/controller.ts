import { Request, Response } from 'express';
import { BillsRepository } from './repository_interface.js';

export class BillsController {
    private repo : BillsRepository
    constructor(repo : BillsRepository) {
        this.repo = repo
    }
    async list(req : Request, res : Response){
        try {
            const bills = this.repo.list();
            res.json(bills);
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
            const bill = this.repo.get(req.params.id)
            res.json(bill)
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
            const billData = req.body
            const bill = this.repo.add(billData)
            res.json(bill)
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