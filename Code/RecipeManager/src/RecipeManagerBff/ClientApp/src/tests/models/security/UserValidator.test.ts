import { User } from "../../../models/security/User"
import { UserValidator } from "../../../models/security/UserValidator"

describe("Method validateName returns ", () => {
    it.each([
        [true, "Toni"],
        [true, "E"],
        [true, "35"],
        [true, "aZ3-+._@"],
        [false, ""],
        [false, "   "],
        [false, " e  "]
    ])("%p when invoked with name: %s", (result: boolean, name: string) => {
        expect(UserValidator.validateName(name)).toBe(result)
    })
})

describe("Method validatePassword returns ", () => {
    it.each([
        [true, "eP1!ii"],
        [true, "aZL39@!"],
        [true, ""],
        [false, "e"],
        [false, "E"],
        [false, "35"],
        [false, "   "],
        [false, " e  "],
        [false, "e P1!ii"]
    ])("%p when invoked with name: %s", (result: boolean, name: string) => {
        expect(UserValidator.validatePassword(name)).toBe(result)
    })
})



describe("Method validate returns ", () => {
    it.each([
        [true, {name: "Toni", newPassword: "eP1!ii"} as User],
        [false, {name: " e  ", newPassword: "eP1!ii"} as User],
        [false, {name: "Toni", newPassword: "35"} as User],
        [false, {name: " e  ", newPassword: "35"} as User]
    ])("%p when invoked with name: %s", (result: boolean, user: User) => {
        expect(UserValidator.validate(user)).toBe(result)
    })
})