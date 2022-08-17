import { Recipe } from "./Recipe"

export class ScheduledRecipe{
    id?: number
    date: Date
    recipe?: Recipe

    constructor(date: Date) {
        this.date = date
    }
}

export function createScheduledRecipe(date: Date) {
    return new ScheduledRecipe(date)
}