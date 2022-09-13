import { Claim, ClaimTypes } from "../../../models/security/Claim"

const claimValue: string = "User"

test('Claim type is undefined by default', () => {
    // Arrange
    const claim: Claim = new Claim()

    // Act

    // Assert
    expect(claim.type).toEqual(undefined)
})

test('Claim value is undefined by default', () => {
    // Arrange
    const claim: Claim = new Claim()

    // Act

    // Assert
    expect(claim.value).toEqual(undefined)
})

test('Claim type is set correct', () => {
    // Arrange
    const claim: Claim = new Claim()

    // Act
    claim.type = ClaimTypes.Role

    // Assert
    expect(claim.type).toEqual(ClaimTypes.Role)
})

test('Claim value is set correct', () => {
    // Arrange
    const claim: Claim = new Claim()

    // Act
    claim.value = claimValue

    // Assert
    expect(claim.value).toEqual(claimValue)
})