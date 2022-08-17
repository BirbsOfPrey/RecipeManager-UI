import { Recipe } from "./Recipe"

export class ScheduledRecipe{
    id?: number
    date: Date
    recipe?: Recipe

    constructor(date: Date) {
        this.date = date
    }
}

export function createScheduledRecipe(date: Date): ScheduledRecipe {
    return new ScheduledRecipe(date)
}

export function mapIsoStringToDate(scheduledRecipes: ScheduledRecipe[]) {
    scheduledRecipes.forEach(scheduledRecipe => {
        const dateIsoString = scheduledRecipe.date
        scheduledRecipe.date = new Date(dateIsoString)
    })
}