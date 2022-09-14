import { createUser, User } from "../../../models/security/User"

const userId = "abc-def-ghi"
const userName = "ToniLässig"
const userFirstName = "Toni"
const userFamilyName = "Huber"
const userOldPassword = "ejKL!82"
const userNewPassword = "ejKL!83"
const userEmail = "email@noemail.com"
const userRole = "User"

test("User id is undefined by default", () => {
    // Arrange
    const user: User = createUser()

    // Act

    // Assert
    expect(user.id).toEqual(undefined)
})

test("User name is undefined by default", () => {
    // Arrange
    const user: User = createUser()

    // Act

    // Assert
    expect(user.name).toBe(undefined)
})

test("User first name is undefined by default", () => {
    // Arrange
    const user: User = createUser()

    // Act

    // Assert
    expect(user.firstName).toBe(undefined)
})

test("User family name is undefined by default", () => {
    // Arrange
    const user: User = createUser()

    // Act

    // Assert
    expect(user.familyName).toBe(undefined)
})

test("User old password is undefined by default", () => {
    // Arrange
    const user: User = createUser()

    // Act

    // Assert
    expect(user.oldPassword).toBe(undefined)
})

test("User new password is undefined by default", () => {
    // Arrange
    const user: User = createUser()

    // Act

    // Assert
    expect(user.newPassword).toBe(undefined)
})

test("User email is undefined by default", () => {
    // Arrange
    const user: User = createUser()

    // Act

    // Assert
    expect(user.email).toBe(undefined)
})

test("User role is undefined by default", () => {
    // Arrange
    const user: User = createUser()

    // Act

    // Assert
    expect(user.role).toBe(undefined)
})

test("User id is set correct", () => {
    // Arrange
    const user: User = createUser()

    // Act
    user.id = userId

    // Assert
    expect(user.id).toEqual(userId)
})

test("User name is set correct", () => {
    // Arrange
    const user: User = createUser()

    // Act
    user.name = userName

    // Assert
    expect(user.name).toBe(userName)
})

test("User first name is set correct", () => {
    // Arrange
    const user: User = createUser()

    // Act
    user.firstName = userFirstName

    // Assert
    expect(user.firstName).toBe(userFirstName)
})

test("User family name is set correct", () => {
    // Arrange
    const user: User = createUser()

    // Act
    user.familyName = userFamilyName

    // Assert
    expect(user.familyName).toBe(userFamilyName)
})

test("User old password is set correct", () => {
    // Arrange
    const user: User = createUser()

    // Act
    user.oldPassword = userOldPassword

    // Assert
    expect(user.oldPassword).toBe(userOldPassword)
})

test("User new password is set correct", () => {
    // Arrange
    const user: User = createUser()

    // Act
    user.newPassword = userNewPassword

    // Assert
    expect(user.newPassword).toBe(userNewPassword)
})

test("User email is set correct", () => {
    // Arrange
    const user: User = createUser()

    // Act
    user.email = userEmail

    // Assert
    expect(user.email).toBe(userEmail)
})

test("User role is set correct", () => {
    // Arrange
    const user: User = createUser()

    // Act
    user.role = userRole

    // Assert
    expect(user.role).toBe(userRole)
})