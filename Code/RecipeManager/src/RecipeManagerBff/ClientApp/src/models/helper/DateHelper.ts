import StringResource from "../../resources/StringResource"

export class DateHelper {
    static getDayOfWeekAsNumbers(): number[] {
        return [1, 2, 3, 4, 5, 6, 7]
    }
    
    static getNameOfCurrentDay(day: number): string {
        switch (day) {
            case 0:
                return StringResource.General.Sunday
            case 1:
                return StringResource.General.Monday
            case 2:
                return StringResource.General.Tuesday
            case 3:
                return StringResource.General.Wednesday
            case 4:
                return StringResource.General.Thursday
            case 5:
                return StringResource.General.Friday
            case 6:
                return StringResource.General.Saturday
            default:
                return StringResource.General.Unknown
        }
    }
}