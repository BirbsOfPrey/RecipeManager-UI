import { fireEvent, queryByDisplayValue, queryByText, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UserEdit } from '../../../../components/widgets/user/UserEdit'
import { User } from '../../../../models/security/User'
import StringResource from '../../../../resources/StringResource'

const testUserId: string = "abc-def-ghi"
const testUserName: string = "Franzi"
const testFirstName: string = "Franziska"
const testFamilyName: string = "Meier"
const testOldPassword: string = "lKr24589!"
const testNewPassword: string = "lKr24500!"
const testEmail: string = "franzi@noemail.com"
const testRole: string = "User"
const testUser = {
    name: testUserName,
    firstName: testFirstName,
    familyName: testFamilyName,
    newPassword: testNewPassword,
    email: testEmail,
    role: testRole
} as User
const testExistingUser = {
    id: testUserId,
    name: testUserName,
    firstName: testFirstName,
    familyName: testFamilyName,
    oldPassword: testOldPassword,
    newPassword: testNewPassword,
    email: testEmail,
    role: testRole
} as User

const mockSetValue = jest.fn()

test('renders fields of name, first name, family name, email and role when not editable', () => {
    // Arrange

    // Act
    const { container } = render(<UserEdit user={testUser} setValue={mockSetValue} editable={false} />)

    // Assert
    expect(screen.getByDisplayValue(testUserName)).toBeInTheDocument
    expect(screen.getByDisplayValue(testRole)).toBeInTheDocument
    expect(screen.getByDisplayValue(testFirstName)).toBeInTheDocument
    expect(screen.getByDisplayValue(testFamilyName)).toBeInTheDocument
    expect(screen.getByDisplayValue(testEmail)).toBeInTheDocument

    expect(container.getElementsByClassName("userEdit__nameField").length).toBe(1)
    expect(container.getElementsByClassName("roleAutocomplete__role").length).toBe(1)
    expect(container.getElementsByClassName("userEdit__firstNameField").length).toBe(1)
    expect(container.getElementsByClassName("userEdit__familyNameField").length).toBe(1)
    expect(container.getElementsByClassName("userEdit__emailField").length).toBe(1)
})

test('renders fields of name, first name, family name, email and role when editable', () => {
    // Arrange

    // Act
    const { container } = render(<UserEdit user={testUser} setValue={mockSetValue} editable={true} />)

    // Assert
    expect(screen.getByDisplayValue(testUserName)).toBeInTheDocument
    expect(screen.getByDisplayValue(testRole)).toBeInTheDocument
    expect(screen.getByDisplayValue(testFirstName)).toBeInTheDocument
    expect(screen.getByDisplayValue(testFamilyName)).toBeInTheDocument
    expect(screen.getByDisplayValue(testEmail)).toBeInTheDocument

    expect(container.getElementsByClassName("userEdit__nameField").length).toBe(1)
    expect(container.getElementsByClassName("roleAutocomplete__role").length).toBe(1)
    expect(container.getElementsByClassName("userEdit__firstNameField").length).toBe(1)
    expect(container.getElementsByClassName("userEdit__familyNameField").length).toBe(1)
    expect(container.getElementsByClassName("userEdit__emailField").length).toBe(1)
})

test('does not render textfields of passwords when not editable', () => {
    // Arrange

    // Act
    const { container } = render(<UserEdit user={testUser} setValue={mockSetValue} editable={false} />)

    // Assert
    expect(queryByDisplayValue(container, testOldPassword)).not.toBeInTheDocument
    expect(queryByDisplayValue(container, testNewPassword)).not.toBeInTheDocument

    expect(container.getElementsByClassName("userEdit__oldPasswordField").length).toBe(0)
    expect(container.getElementsByClassName("userEdit__newPasswordField").length).toBe(0)
})

test('renders password textfields but no visible passwords when existing user and editable', () => {
    // Arrange

    // Act
    const { container } = render(<UserEdit user={testExistingUser} setValue={mockSetValue} editable={true} />)

    // Assert
    expect(queryByDisplayValue(container, testOldPassword)).not.toBeInTheDocument
    expect(queryByDisplayValue(container, testNewPassword)).not.toBeInTheDocument

    expect(container.getElementsByClassName("userEdit__oldPasswordField").length).toBe(1)
    expect(container.getElementsByClassName("userEdit__newPasswordField").length).toBe(1)
})

test('renders only new password textfield but no visible password when new user and editable', () => {
    // Arrange

    // Act
    const { container } = render(<UserEdit user={testUser} setValue={mockSetValue} editable={true} />)

    // Assert
    expect(queryByDisplayValue(container, testOldPassword)).not.toBeInTheDocument
    expect(queryByDisplayValue(container, testNewPassword)).not.toBeInTheDocument

    expect(container.getElementsByClassName("userEdit__oldPasswordField").length).toBe(0)
    expect(container.getElementsByClassName("userEdit__newPasswordField").length).toBe(1)
})

test('does not render helpertext if user name is valid', () => {
    // Arrange

    // Act
    const { container } = render(<UserEdit user={testUser} setValue={mockSetValue} editable={true} />)

    // Assert
    expect(queryByText(container, StringResource.Messages.RequiredUserName)).not.toBeInTheDocument
})

test('renders helpertext if user name not valid', () => {
    // Arrange
    const notValidUserName: string = ")Bobby("
    testUser.name = notValidUserName
    // Act
    render(<UserEdit user={testUser} setValue={mockSetValue} editable={true} />)

    // Assert
    expect(screen.getByText(StringResource.Messages.RequiredUserName)).toBeInTheDocument
})

test('renders helpertext if new password is set but old password is empty', () => {
    // Arrange
    testExistingUser.oldPassword = ""

    // Act
    const { container } = render(<UserEdit user={testExistingUser} setValue={mockSetValue} editable={true} />)

    // Assert
    expect(queryByText(container, StringResource.Messages.RequiredOldPassword)).toBeInTheDocument
    expect(queryByText(container, StringResource.Messages.RequiredPassword)).not.toBeInTheDocument
})

test('does not render helpertexts if new password is empty', () => {
    // Arrange
    testExistingUser.newPassword = ""

    // Act
    const { container } = render(<UserEdit user={testExistingUser} setValue={mockSetValue} editable={true} />)

    // Assert
    expect(queryByText(container, StringResource.Messages.RequiredOldPassword)).not.toBeInTheDocument
    expect(queryByText(container, StringResource.Messages.RequiredPassword)).not.toBeInTheDocument
})

test('does not render helpertext if password of new user is valid', () => {
    // Arrange

    // Act
    const { container } = render(<UserEdit user={testUser} setValue={mockSetValue} editable={true} />)

    // Assert
    expect(queryByText(container, StringResource.Messages.RequiredPassword)).not.toBeInTheDocument
})

test('does not render helpertexts if password of existing user is valid and old password is set', () => {
    // Arrange

    // Act
    const { container } = render(<UserEdit user={testExistingUser} setValue={mockSetValue} editable={true} />)

    // Assert
    expect(queryByText(container, StringResource.Messages.RequiredOldPassword)).not.toBeInTheDocument
    expect(queryByText(container, StringResource.Messages.RequiredPassword)).not.toBeInTheDocument
})

test('calls set value correct after name input changes', async () => {
    // Arrange
    const { container } = render(<UserEdit user={testExistingUser} setValue={mockSetValue} editable={true} />)

    // Act
    const element = container.getElementsByClassName("userEdit__nameField")[0].querySelector("input") ?? new Element()
    fireEvent.change(element, { target: { value: "Gollum" }})

    // Assert
    await waitFor(() => { expect(mockSetValue).toBeCalledWith("name", "Gollum") })
})

test('calls set value correct after first name input changes', async () => {
    // Arrange
    const { container } = render(<UserEdit user={testExistingUser} setValue={mockSetValue} editable={true} />)

    // Act
    const element = container.getElementsByClassName("userEdit__firstNameField")[0].querySelector("input") ?? new Element()
    fireEvent.change(element, { target: { value: "Frodo" }})

    // Assert
    await waitFor(() => { expect(mockSetValue).toBeCalledWith("firstName", "Frodo") })
})

test('calls set value correct after family name input changes', async () => {
    // Arrange
    const { container } = render(<UserEdit user={testExistingUser} setValue={mockSetValue} editable={true} />)

    // Act
    const element = container.getElementsByClassName("userEdit__familyNameField")[0].querySelector("input") ?? new Element()
    fireEvent.change(element, { target: { value: "Lüscher" }})

    // Assert
    await waitFor(() => { expect(mockSetValue).toBeCalledWith("familyName", "Lüscher") })
})

test('calls set value correct after email input changes', async () => {
    // Arrange
    const { container } = render(<UserEdit user={testExistingUser} setValue={mockSetValue} editable={true} />)

    // Act
    const element = container.getElementsByClassName("userEdit__emailField")[0].querySelector("input") ?? new Element()
    fireEvent.change(element, { target: { value: "abc@mail.com" }})

    // Assert
    await waitFor(() => { expect(mockSetValue).toBeCalledWith("email", "abc@mail.com") })
})

test('calls set value correct after old password input changes', async () => {
    // Arrange
    const { container } = render(<UserEdit user={testExistingUser} setValue={mockSetValue} editable={true} />)

    // Act
    const element = container.getElementsByClassName("userEdit__oldPasswordField")[0].querySelector("input") ?? new Element()
    fireEvent.change(element, { target: { value: "bla7!34S" }})

    // Assert
    await waitFor(() => { expect(mockSetValue).toBeCalledWith("oldPassword", "bla7!34S") })
})

test('calls set value correct after new password input changes', async () => {
    // Arrange
    const { container } = render(<UserEdit user={testExistingUser} setValue={mockSetValue} editable={true} />)

    // Act
    const element = container.getElementsByClassName("userEdit__newPasswordField")[0].querySelector("input") ?? new Element()
    fireEvent.change(element, { target: { value: "bla7!34S" }})

    // Assert
    await waitFor(() => { expect(mockSetValue).toBeCalledWith("newPassword", "bla7!34S") })
})