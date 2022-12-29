import { immerable } from "immer"

export class Ingredient {
    [immerable]: boolean = true
    
    id?: number
    name: string

    constructor() {
        this.name = ""
    }
}

export function createIngredient() {
    return new Ingredient()
}