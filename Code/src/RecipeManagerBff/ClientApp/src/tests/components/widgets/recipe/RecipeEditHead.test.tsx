import { render, screen } from "@testing-library/react"
import { RecipeEditHead } from "../../../../components/widgets/recipe/RecipeEditHead"
import StringResource from "../../../../resources/StringResource"

const recipeName: string = "Kn"
const recipeDescription: string = "├╝berbacken"

const mockSetValue = jest.fn()

test("renders textfield of name", () => {
    // Arrange

    // Act
    const { container } = render(<RecipeEditHead name={recipeName} description={recipeDescription} setValue={mockSetValue} editable={false} />)

    // Assert
    expect(screen.getByDisplayValue(recipeName)).toBeInTheDocument()

    expect(container.getElementsByClassName("recipeEditHead__nameField").length).toBe(1)
})

test("does not render textfield of description if not editable", () => {
    // Arrange

    // Act
    const { container } = render(<RecipeEditHead name={recipeName} description={recipeDescription} setValue={mockSetValue} editable={false} />)

    // Assert
    expect(container.getElementsByClassName("recipeEditHead__descriptionField").length).toBe(0)
})

test("renders textfield of description if editable", () => {
    // Arrange

    // Act
    const { container } = render(<RecipeEditHead name={recipeName} description={recipeDescription} setValue={mockSetValue} editable={true} />)

    // Assert
    expect(screen.getByDisplayValue(recipeDescription)).toBeInTheDocument()

    expect(container.getElementsByClassName("recipeEditHead__descriptionField").length).toBe(1)
})

test("renders helpertext if recipe name not valid", () => {
    // Arrange
    const notValidRecipeName: string = "Kn"

    // Act
    render(<RecipeEditHead name={notValidRecipeName} description={recipeDescription} setValue={mockSetValue} editable={false} />)

    // Assert
    expect(screen.getByText(StringResource.Messages.RequiredRecipeName)).toBeInTheDocument()
})

test("renders helpertext if recipe description not valid", () => {
    // Arrange
    const notValidRecipeDescription: string = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores "


    // Act
    render(<RecipeEditHead name={recipeName} description={notValidRecipeDescription} setValue={mockSetValue} editable={true} />)

    // Assert
    expect(screen.getByText(StringResource.Messages.MaxDescriptionLength)).toBeInTheDocument()
})