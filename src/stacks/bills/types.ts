export interface Bill {
    id: string,
    name: string
    amount: number
    dueDate: string,
    paid: boolean
}

export interface BillData {
    name: string
    amount: number
    dueDate: string,
    paid: boolean
}