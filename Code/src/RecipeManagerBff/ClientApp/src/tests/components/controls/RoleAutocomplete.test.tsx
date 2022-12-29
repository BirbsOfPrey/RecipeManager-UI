import { fireEvent, queryByDisplayValue, render, screen, waitFor } from "@testing-library/react"
import { RoleAutocomplete } from "../../../components/controls/RoleAutocomplete"
import { Roles } from "../../../models/security/Roles"

const mockUpdateRole = jest.fn()

test("renders textfield with role correct", () => {
    // Arrange
    const role: string = Roles.User

    // Act
    const { container } = render(<RoleAutocomplete role={role} updateRole={mockUpdateRole} editable={false} />)

    // Assert
    expect(screen.getByDisplayValue(role)).toBeInTheDocument()

    expect(container.getElementsByClassName("roleAutocomplete__role").length).toBe(1)
})

test("renders textfield without role correct", () => {
    // Arrange

    // Act
    const { container } = render(<RoleAutocomplete updateRole={mockUpdateRole} editable={false} />)

    // Assert
    expect(queryByDisplayValue(container, Roles.User)).not.toBeInTheDocument()

    expect(container.getElementsByClassName("roleAutocomplete__role").length).toBe(1)
})