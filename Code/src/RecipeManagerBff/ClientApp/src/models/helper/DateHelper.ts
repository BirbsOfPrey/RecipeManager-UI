import { Info } from "luxon"

export class DateHelper {
    static getDayOfWeekAsNumbers(): number[] {
        return [1, 2, 3, 4, 5, 6, 7]
    }
    
    static getNameOfCurrentDay(day: number): string {
        if (day < 0 || day > 6) {
            return ""
        }
        day = day === 0 ? 6 : day - 1
        return Info.weekdays("long", {locale: "de-DE"})[day]
    }

    static getStringOfDate(date: Date): string {
        return new Intl.DateTimeFormat("de-DE").format(date)
    }
}