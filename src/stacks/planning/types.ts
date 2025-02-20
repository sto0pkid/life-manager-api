export interface GoalDependencyData {
    name : string
}

export interface GoalDependency {
    id : string
    name : string
}

export type Goal = {
    id: string,
    name: string,
    description: string,
    completeBy: string,
    dependsOn: {id: string, name: string}[]
}

export type GoalInput = {
    name: string,
    description: string,
    completeBy: string,
}