import { NO_INDEX } from "../../../models/helper/ArrayHelper"

test("NO-INDEX returns -1", () => {
    // Arrange

    // Act
    const noIndex: number = NO_INDEX

    // Assert
    expect(noIndex).toBe(-1)
})