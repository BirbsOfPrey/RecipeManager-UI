import { immerable } from "immer"
import { Recipe } from "./Recipe"

export class ScheduledRecipe{
    [immerable]: boolean = true
    
    id?: number
    date: Date
    recipe?: Recipe

    constructor(date: Date) {
        this.date = date
    }
}

export function createScheduledRecipe(): ScheduledRecipe {
    return new ScheduledRecipe(new Date())
}

export function createScheduledRecipeWithDate(date: Date): ScheduledRecipe {
    return new ScheduledRecipe(date)
}

export function mapIsoStringToDate(scheduledRecipes: ScheduledRecipe[]) {
    scheduledRecipes.forEach(scheduledRecipe => {
        const dateIsoString = scheduledRecipe.date
        scheduledRecipe.date = new Date(dateIsoString)
    })
}