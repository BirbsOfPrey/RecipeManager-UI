import { precisionRound } from "../../../models/helper/MathHelper"

describe("Method precisionRound returns ", () => {
    it.each([
        [1.54, 1.543, 2],
        [11, 11.1, 0],
        [20, 21, -1],
        [0.333, 0.3333333, 3],
        [0.334, 0.3338, 3],
        [200, 154, -2]
    ])("%p when invoked with number: %p and precision: %p", (result: number, number: number, precision: number) => {
        expect(precisionRound(number, precision)).toEqual(result)
    })
})