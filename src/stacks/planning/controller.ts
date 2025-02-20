import { Request, Response } from 'express';
import { GoalsRepository } from './repository_interface.js';

export class GoalsController {
    private repo : GoalsRepository
    constructor(repo : GoalsRepository) {
        this.repo = repo
    }
    async list(req : Request, res : Response){
        try {
            const goals = this.repo.list();
            res.json(goals);
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
            const goal = this.repo.get(req.params.id)
            res.json(goal)
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
            const goalData = req.body
            const goal = this.repo.add(goalData)
            res.json(goal)
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

    async listDependencies(req : Request, res : Response){
        try {
            const id = req.params.id
            if(typeof id === 'undefined'){
                throw new Error('INVALID_INPUT')
            }
            const dependencies = this.repo.listDependencies(id);
            res.json(dependencies);
        } catch (error : unknown) {
            if(error instanceof Error){
                res.status(500).json({ message: error.message });
            } else {
                throw error
            }
        }
    }

    async getDependency(req : Request, res : Response){
        try {
            const id = req.params.id
            const dependencyId = req.params.dependencyId
            if(typeof id === 'undefined'){
                throw new Error('INVALID_INPUT')
            }
            if(typeof dependencyId === 'undefined'){
                throw new Error('INVALID_INPUT')
            }
            const dependencies = this.repo.getDependency(id, dependencyId);
            res.json(dependencies);
        } catch (error : unknown) {
            if(error instanceof Error){
                res.status(500).json({ message: error.message });
            } else {
                throw error
            }
        }
    }

    async addDependency(req : Request, res : Response){
        try {
            const id = req.params.id
            if(typeof id === 'undefined'){
                throw new Error('INVALID_INPUT')
            }
            const dependencyData = req.body
            const dependency = this.repo.addDependency(id, dependencyData)
            res.json(dependency)
        } catch (error : unknown){
            if(error instanceof Error){
                res.status(500).json({ message: error.message });
            } else {
                throw error
            }
        }
    }

    async removeDependency(req : Request, res : Response){
        try {
            const id = req.params.id
            if(typeof id === 'undefined'){
                throw new Error('INVALID_INPUT')
            }
            const dependencyId = req.params.dependencyId
            if(typeof dependencyId === 'undefined'){
                throw new Error('INVALID_INPUT')
            }
            const dependency = this.repo.removeDependency(id, dependencyId)
            res.json(dependency)
        } catch (error : unknown){
            if(error instanceof Error){
                res.status(500).json({ message: error.message });
            } else {
                throw error
            }
        }
    }

    async updateDependency(req : Request, res : Response){
        try {
            const id = req.params.id
            if(typeof id === 'undefined'){
                throw new Error('INVALID_INPUT')
            }
            const dependencyId = req.params.dependencyId
            if(typeof dependencyId === 'undefined'){
                throw new Error('INVALID_INPUT')
            }
            const dependencyData = req.body
            this.repo.updateDependency(id, dependencyId, dependencyData)
            res.json()
        } catch (error : unknown){
            if(error instanceof Error){
                res.status(500).json({ message: error.message });
            } else {
                throw error
            }
        }
    }
}