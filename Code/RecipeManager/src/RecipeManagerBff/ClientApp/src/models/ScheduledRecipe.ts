export class ScheduledRecipe{
    id?: number
    date: Date
    recipeId: number

    constructor(date: Date, recipeId: number) {
        this.date = date
        this.recipeId = recipeId
    }
}

export function createScheduledRecipe(date: Date) {
    return new ScheduledRecipe(date, 0)
}