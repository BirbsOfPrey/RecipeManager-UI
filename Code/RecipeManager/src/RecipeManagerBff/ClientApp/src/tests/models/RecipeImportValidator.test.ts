import { RecipeImportValidator } from "../../models/RecipeImportValidator"

describe("Method validatePersonRefAmount returns ", () => {
    it.each([
        [true, 1],
        [true, 10],
        [true, 9],
        [false, 11],
        [false, 0],
        [false, undefined]
    ])("%p when invoked with amount: %p", (result: boolean, value?: number) => {
        expect(RecipeImportValidator.validateImportAmount(value)).toBe(result)
    })
})