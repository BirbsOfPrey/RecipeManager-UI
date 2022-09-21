import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { SearchField } from "../../../components/controls/SearchField"

const mockOnSearch = jest.fn()
const search: string = "Cake"

test("renders search field value correct", () => {
    // Arrange

    // Act
    const { container } = render(<SearchField value={search} onSearch={mockOnSearch} />)

    // Assert
    expect(screen.getByDisplayValue(search)).toBeInTheDocument()

    expect(container.getElementsByClassName("searchField__textField").length).toBe(1)
    expect(container.getElementsByClassName("searchField__button").length).toBe(1)
})

test("updates the search value when input changes but does not execute the search", async () => {
    // Arrange
    const { container } = render(<SearchField value={""} onSearch={mockOnSearch} />)

    // Act
    const element = container.getElementsByClassName("searchField__textField")[0].querySelector("input") ?? new Element()
    fireEvent.change(element, { target: { value: search }})

    // Assert
    await waitFor(() => { 
        expect(element).toHaveValue(search)
        expect(mockOnSearch).not.toBeCalled
    })
})

test("executes the search on search button click", async () => {
    // Arrange
    const { container } = render(<SearchField value={search} onSearch={mockOnSearch} />)

    // Act
    userEvent.click(container.getElementsByClassName("searchField__button")[0])

    // Assert
    await waitFor(() => { expect(mockOnSearch).toBeCalledWith(search) })
})

test("executes the search on keyboard enter", async () => {
    // Arrange
    const { container } = render(<SearchField value={search} onSearch={mockOnSearch} />)

    // Act
    const element = container.getElementsByClassName("searchField__textField")[0] ?? new Element()
    fireEvent.keyDown(element, { key: 'Enter', charCode: 13 })

    // Assert
    await waitFor(() => { expect(mockOnSearch).toBeCalledWith(search) })
})

test("does not execute the search on another keyboard key down beside enter", async () => {
    // Arrange
    const { container } = render(<SearchField value={search} onSearch={mockOnSearch} />)

    // Act
    const element = container.getElementsByClassName("searchField__textField")[0].querySelector("input") ?? new Element()
    fireEvent.keyPress(element, { key: 'E', charCode: 69 })
    fireEvent.keyPress(element, { key: '^', charCode: 94 })
    fireEvent.keyPress(element, { key: 'Space', charCode: 32 })

    // Assert
    await waitFor(() => { expect(mockOnSearch).not.toBeCalled })
})