import { IngredientValidator } from "../../models/IngredientValidator"

describe("Method validateName returns ", () => {
    it.each([
        [true, "A"],
        [true, "Birne"],
        [false, ""]
    ])("%p when invoked with name: %s", (result: boolean, name: string) => {
        expect(IngredientValidator.validateName(name)).toBe(result)
    })
})