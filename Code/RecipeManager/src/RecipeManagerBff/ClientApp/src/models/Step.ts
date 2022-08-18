import { immerable } from "immer"

export class Step {
    [immerable]: boolean = true
    
    id?: number
    stepNumber?: number
    instruction?: string
}

export function createStep() {
    return new Step()
}

export function createSteps() {
    return [] as Step[]
}