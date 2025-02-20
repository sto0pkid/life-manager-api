import {v4 as newId} from 'uuid'
import { Goal, GoalInput, GoalDependency, GoalDependencyData } from './types.js'

export class Repository {
    private data : {[key:string] : Goal}

    constructor(data : {[key:string] : Goal}){
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
    add(goal : GoalInput){
        const id = newId()
        this.data[id] = {
            ...goal,
            dependsOn: [],
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

    update(id : string, goal : GoalInput ){
        if(typeof this.data[id] === 'undefined'){
            throw new Error('NOT_FOUND')
        }
        this.data[id] = {
            ...goal,
            dependsOn: this.data[id].dependsOn,
            id
        }
    }

    listDependencies(id : string){
        if(typeof this.data[id] === 'undefined'){
            throw new Error('NOT_FOUND')
        }
        return this.data[id].dependsOn
    }
    getDependency(id : string, dependencyId : string){
        if(typeof this.data[id] === 'undefined'){
            throw new Error('NOT_FOUND')
        }
        const matches = this.data[id].dependsOn.filter(item => item.id === dependencyId)
        if(matches.length === 0){
            throw new Error('NOT_FOUND')
        } else {
            return matches[0]
        }

    }
    addDependency(id : string, dependencyData : GoalDependencyData){
        if(!(id in this.data)){
            throw new Error('NOT_FOUND')
        }
        const newDependencyId = newId()
        const newDependency = {
            ...dependencyData,
            id : newDependencyId
        }
        this.data[id]?.dependsOn.push(newDependency)
        return newDependency

    }
    removeDependency(id : string, dependencyId : string){
        if(typeof this.data[id] === 'undefined'){
            throw new Error('NOT_FOUND')
        }
        const matches = this.data[id].dependsOn.filter(item => item.id === dependencyId)
        if(matches.length === 0){
            throw new Error('NOT_FOUND')
        }
        this.data[id].dependsOn = this.data[id]?.dependsOn.filter(item => item.id !== dependencyId)
    }

    updateDependency(id : string, dependencyId : string, dependencyData : GoalDependencyData){
        if(typeof this.data[id] === 'undefined'){
            throw new Error('NOT_FOUND')
        }
        const matches = this.data[id].dependsOn.filter(item => item.id === dependencyId)
        if(matches.length === 0){
            throw new Error('NOT_FOUND')
        }
        matches[0] = {
            ...dependencyData,
            id: dependencyId
        }
    }
}