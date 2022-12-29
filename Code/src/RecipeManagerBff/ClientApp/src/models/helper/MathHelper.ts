// Taken from https://www.autoscripts.net/round-up-number-typescript/
export function precisionRound(number: number, precision: number) {
    if (precision < 0) {
        var factor = Math.pow(10, precision)
        return Math.round(number * factor) / factor
    } else {
        return +(Math.round(Number(number + "e+" + precision)) + "e-" + precision)
    }
}