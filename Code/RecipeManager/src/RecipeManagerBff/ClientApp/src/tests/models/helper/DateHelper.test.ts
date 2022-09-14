import { DateHelper } from "../../../models/helper/DateHelper"

test("Method getDayOfWeekAsNumbers returns correct number array", () => {
    // Arrange
    const weekAsNumbersReference: number[] = [1, 2, 3, 4, 5, 6, 7]

    // Act
    const weekAsNumbers: number[] = DateHelper.getDayOfWeekAsNumbers()

    // Assert
    expect(weekAsNumbers).toEqual(weekAsNumbersReference)
})

describe("Method getNameOfCurrentDay returns ", () => {
    it.each([
        ["", -1],
        ["Sonntag", 0],
        ["Montag", 1],
        ["Dienstag", 2],
        ["Mittwoch", 3],
        ["Donnerstag", 4],
        ["Freitag", 5],
        ["Samstag", 6],
        ["", 7]
    ])("%s when invoked with %p", (result: string, day: number) => {
        expect(DateHelper.getNameOfCurrentDay(day)).toEqual(result)
    })
})

test("Method getStringOfDate returns date in correct format", () => {
    // Arrange
    const testDate: Date = new Date("2022-03-08")

    // Act
    const dateAsString: string = DateHelper.getStringOfDate(testDate)

    // Assert
    expect(dateAsString).toEqual("8.3.2022")
})