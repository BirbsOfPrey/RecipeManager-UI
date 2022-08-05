export class ScheduledRecipe{
    id?: number
    date: Date
    recipeId: number

    constructor(date: Date, recipeId: number) {
        this.date = date
        this.recipeId = recipeId
    }
}

export function createScheduledRecipe(date: Date, recipeId: number) {
    return new ScheduledRecipe(date, recipeId)
}