import { createRecipe, Recipe } from "../../models/Recipe"
import { RecipeValidator } from "../../models/RecipeValidator"

const descriptionWith200Characters: string = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores "
const descriptionWith199Characters: string = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores"


describe('Method validateName returns ', () => {
    it.each([
        [true, "Kiwi"],
        [false, "Aki"],
        [false, ""],
        [false, undefined]
    ])('%p when invoked with name: %s', (result: boolean, name?: string) => {
        expect(RecipeValidator.validateName(name)).toBe(result)
    })
})

describe('Method validateDescription returns ', () => {
    it.each([
        [true, descriptionWith199Characters],
        [false, descriptionWith200Characters],
        [true, ""],
        [true, undefined]
    ])('%p when invoked with description: %s', (result: boolean, description?: string) => {
        expect(RecipeValidator.validateDescription(description)).toBe(result)
    })
})

describe('Method validatePersonRefAmount returns ', () => {
    it.each([
        [true, 1],
        [true, 1000],
        [true, 499],
        [false, 1001],
        [false, 0],
        [false, undefined]
    ])('%p when invoked with personRefAmount: %p', (result: boolean, value?: number) => {
        expect(RecipeValidator.validatePersonRefAmount(value)).toBe(result)
    })
})

describe('Method validate returns ', () => {
    it.each([
        [true, 4, "Kuchen", "süss und herrlich"],
        [false, 4, "Al", "süss und herrlich"],
        [false, 4, "Kuchen", descriptionWith200Characters],
        [false, 0, "Kuchen", "süss und herrlich"]
    ])('%p when invoked with personRefAmount: %p, name: %s and description: %s', (result: boolean, value: number, name?: string, description?: string) => {
        const recipe: Recipe = createRecipe()
        recipe.name = name
        recipe.description= description
        recipe.personRefAmount = value
        expect(RecipeValidator.validate(recipe)).toBe(result)
    })
})