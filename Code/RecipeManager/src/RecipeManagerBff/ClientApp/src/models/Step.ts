export class Step {
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