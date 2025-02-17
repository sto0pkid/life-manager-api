import { Request, Response } from 'express';
import { BillsRepository } from './repository_interface';

export class BillsController {
    private repo : BillsRepository
    constructor(repo : BillsRepository) {
        this.repo = repo
    }
    async list(req : Request, res : Response){
        try {
            const bills = this.repo.list();
            return res.json(bills);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async get(req : Request, res : Response){
        try {
            const bill = this.repo.get(req.params.id)
            return res.json(bill)
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }
    async add(req : Request, res : Response){
        try {
            const billData = req.body
            const bill = this.repo.add(billData)
            return res.json(bill)
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }

    async remove(req : Request, res : Response){
        try {
            const id = req.params.id
            this.repo.remove(id)
        } catch (error ){
            res.status(500).json({message: error.message})
        }
    }

    async update(req : Request, res : Response){
        try {
            const id = req.params.id
            const data = req.body
            this.repo.update(id, data)
        } catch (error){
            res.status(500).json({message: error.message})
        }
    }
}