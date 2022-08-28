import { IngredientComponentValidator } from "../../models/IngredientComponentValidator"

describe('Method validateAmount returns ', () => {
    it.each([
        [true, 15],
        [false, 0],
        [false, -1],
        [false, undefined]
    ])('%p when invoked with amount: %p', (result: boolean, amount?: number) => {
        expect(IngredientComponentValidator.validateAmount(amount)).toBe(result)
    })
})