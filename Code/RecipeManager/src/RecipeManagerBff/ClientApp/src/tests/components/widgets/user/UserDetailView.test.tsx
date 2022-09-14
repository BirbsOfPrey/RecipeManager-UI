import { queryAllByDisplayValue, queryByText, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom"
import { UserDetailView } from "../../../../components/widgets/user/UserDetailView"
import StringResource from "../../../../resources/StringResource"

const testUserId: string = "abc-def"

const mockNavigate = jest.fn()

test("does not render title if not in edit", () => {
    // Arrange

    // Act
    const { container } = render(<BrowserRouter><UserDetailView userId={testUserId} editable={false} navigate={mockNavigate} /></BrowserRouter>)

    // Assert
    expect(queryByText(container, StringResource.General.CreateNewUser)).not.toBeInTheDocument
    expect(queryByText(container, StringResource.General.EditUser)).not.toBeInTheDocument
})

test("renders main title correct for new user", () => {
    // Arrange

    // Act
    render(<BrowserRouter><UserDetailView editable={true} navigate={mockNavigate} /></BrowserRouter>)

    // Assert
    expect(screen.getByText(StringResource.General.CreateNewUser)).toBeInTheDocument
})

test("renders main title correct for existing user", () => {
    // Arrange

    // Act
    render(<BrowserRouter><UserDetailView userId={"abc-def"} editable={true} navigate={mockNavigate} /></BrowserRouter>)

    // Assert
    expect(screen.getByText(StringResource.General.EditUser)).toBeInTheDocument
})

test("renders editButton if not editable", () => {
    // Arrange

    // Act
    const { container } = render(<BrowserRouter><UserDetailView userId={testUserId} editable={false} navigate={mockNavigate} /></BrowserRouter>)

    // Assert
    expect(container.getElementsByClassName("userDetailView__editButton").length).toBe(1)
    expect(container.getElementsByClassName("userDetailView__viewButton").length).toBe(0)
    expect(container.getElementsByClassName("userDetailView__deleteButton").length).toBe(0)
})

test("renders view and delete button if editable", () => {
    // Arrange

    // Act
    const { container } = render(<BrowserRouter><UserDetailView userId={testUserId} editable={true} navigate={mockNavigate} /></BrowserRouter>)

    // Assert
    expect(container.getElementsByClassName("userDetailView__editButton").length).toBe(0)
    expect(container.getElementsByClassName("userDetailView__viewButton").length).toBe(1)
    expect(container.getElementsByClassName("userDetailView__deleteButton").length).toBe(1)
})

test("renders saveButton if editable", () => {
    // Arrange

    // Act
    const { container } = render(<BrowserRouter><UserDetailView userId={testUserId} editable={true} navigate={mockNavigate} /></BrowserRouter>)

    // Assert
    expect(container.getElementsByClassName("userDetailView__saveButton").length).toBe(1)
})

test("does not render saveButton if not editable", () => {
    // Arrange

    // Act
    const { container } = render(<BrowserRouter><UserDetailView userId={testUserId} editable={false} navigate={mockNavigate} /></BrowserRouter>)

    // Assert
    expect(container.getElementsByClassName("userDetailView__saveButton").length).toBe(0)
})

test("renders UserDetailView correct", () => {
    // Arrange

    // Act
    const { container } = render(<BrowserRouter><UserDetailView userId={testUserId} editable={false} navigate={mockNavigate} /></BrowserRouter>)

    // Assert
    expect(container.getElementsByClassName("userDetailView__container").length).toBe(1)
})

test("renders UserEdit correct", () => {
    // Arrange

    // Act
    const { container } = render(<BrowserRouter><UserDetailView userId={testUserId} editable={false} navigate={mockNavigate} /></BrowserRouter>)

    // Assert
    expect(container.getElementsByClassName("userEdit__container").length).toBe(1)
})

test("initially does not render dialog", () => {
    // Arrange

    // Act
    const { container } = render(<BrowserRouter><UserDetailView userId={testUserId} editable={true} navigate={mockNavigate} /></BrowserRouter>)

    // Assert
    expect(container.getElementsByClassName("userDetailView__dialog").length).toBe(0)
    expect(screen.queryByText(StringResource.Messages.DeleteUserQuestion)).not.toBeInTheDocument
})

test("renders dialog with correct title on click on delete button", async () => {
    // Arrange
    const { container } = render(<BrowserRouter><UserDetailView userId={testUserId} editable={true} navigate={mockNavigate} /></BrowserRouter>)

    // Act
    userEvent.click(container.getElementsByClassName("userDetailView__deleteButton")[0])

    // Assert
    await waitFor(() => { expect(screen.getByText(StringResource.Messages.DeleteUserQuestion)).toBeInTheDocument })
})

test("renders dialog with correct description on click on delete button", async () => {
    // Arrange
    const { container } = render(<BrowserRouter><UserDetailView userId={testUserId} editable={true} navigate={mockNavigate} /></BrowserRouter>)

    // Act
    userEvent.click(container.getElementsByClassName("userDetailView__deleteButton")[0])

    // Assert
    await waitFor(() => { expect(screen.getByText(StringResource.Messages.DeleteUserContent)).toBeInTheDocument })
})

test("renders dialog with correct cancel button on click on delete button", async () => {
    // Arrange
    const { container } = render(<BrowserRouter><UserDetailView userId={testUserId} editable={true} navigate={mockNavigate} /></BrowserRouter>)

    // Act
    userEvent.click(container.getElementsByClassName("userDetailView__deleteButton")[0])

    // Assert
    await waitFor(() => { expect(screen.getByText(StringResource.General.Cancel)).toBeInTheDocument })
})

test("renders dialog with correct delete button on click on delete button", async () => {
    // Arrange
    const { container } = render(<BrowserRouter><UserDetailView userId={testUserId} editable={true} navigate={mockNavigate} /></BrowserRouter>)

    // Act
    userEvent.click(container.getElementsByClassName("userDetailView__deleteButton")[0])

    // Assert
    await waitFor(() => { expect(screen.getByText(StringResource.General.Delete)).toBeInTheDocument })
})

test("returns to DetailView after click on cancel button in the dialog", async () => {
    // Arrange
    const { container } = render(<BrowserRouter><UserDetailView userId={testUserId} editable={true} navigate={mockNavigate} /></BrowserRouter>)
    userEvent.click(container.getElementsByClassName("userDetailView__deleteButton")[0])
    await waitFor(() => { expect(screen.getByText(StringResource.General.Cancel)).toBeInTheDocument })

    // Act
    userEvent.click(screen.getByText(StringResource.General.Cancel))

    // Assert
    await waitFor(() => {
        expect(screen.getByText(StringResource.General.EditUser)).toBeInTheDocument
        expect(container.getElementsByClassName("userDetailView__dialog").length).toBe(0)
    })
})

test("returns to DetailView after click on delete button in the dialog", async () => {
    // Arrange
    const { container } = render(<BrowserRouter><UserDetailView userId={testUserId} editable={true} navigate={mockNavigate} /></BrowserRouter>)
    userEvent.click(container.getElementsByClassName("userDetailView__deleteButton")[0])
    await waitFor(() => { expect(screen.getByText(StringResource.General.Delete)).toBeInTheDocument })

    // Act
    userEvent.click(screen.getByText(StringResource.General.Delete))

    // Assert
    await waitFor(() => {
        expect(screen.getByText(StringResource.General.EditUser)).toBeInTheDocument
        expect(container.getElementsByClassName("userDetailView__dialog").length).toBe(0)
    })
})