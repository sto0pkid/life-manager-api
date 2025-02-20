import { Goal, GoalInput, GoalDependency, GoalDependencyData } from './types.js'
export interface GoalsRepository {
    constructor : Function,
    list : () => {[key:string] : Goal},
    get: (id : string) => Goal | undefined,
    add: (goal : GoalInput) => Goal | undefined,
    remove: (id : string) => void,
    update: (id : string, goal : GoalInput ) => void
    listDependencies: (id : string) => {id : string, name: string}[],
    getDependency: (id : string, dependencyId : string) => GoalDependency | undefined,
    addDependency : (id : string, dependencyData : GoalDependencyData) => GoalDependency | undefined
    removeDependency : (id : string, dependencyId : string) => void
    updateDependency : (id : string, dependencyId : string, dependencyData : GoalDependencyData) => void
}