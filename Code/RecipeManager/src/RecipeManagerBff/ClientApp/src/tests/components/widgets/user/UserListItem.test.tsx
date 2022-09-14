import { render, screen } from "@testing-library/react"
import { createUser, User } from "../../../../models/security/User"
import StringResource from "../../../../resources/StringResource"
import { UserListItem } from "../../../../components/widgets/user/UserListItem"
import { BrowserRouter } from "react-router-dom"

const testUser: User = createUser()
const testUserName: string = "Franziska"
const testUserRole: string = "User"
testUser.name = testUserName
testUser.role = testUserRole

test("renders default text if user with emtpy name and role", () => {
    // Arrange

    // Act
    render(<BrowserRouter><UserListItem user={createUser()} /></BrowserRouter>)

    // Assert
    expect(screen.getByText(StringResource.General.NoUserName)).toBeInTheDocument
    expect(screen.getByText(StringResource.General.NoUserRole)).toBeInTheDocument
})

test("renders correct user name and role", () => {
    // Arrange

    // Act
    render(<BrowserRouter><UserListItem user={testUser} /></BrowserRouter>)

    // Assert
    expect(screen.getByText(testUserName)).toBeInTheDocument
    expect(screen.getByText(testUserRole)).toBeInTheDocument

    expect(screen.queryByText(StringResource.General.NoUserName)).not.toBeInTheDocument
    expect(screen.queryByText(StringResource.General.NoUserRole)).not.toBeInTheDocument
})