import { User } from "./User"

export class UserValidator {
    static allowedChars = "a-z A-Z 0-9 - + . _ @"
    static allowedCharsRegex = new RegExp("^[a-zA-Z0-9-._@+]+$")
    static minPasswordLength = 6

    static validate(user: User): boolean {
        return this.validateName(user.name)
            && this.validatePassword(user.newPassword)
    }

    static validateName(name?: string): boolean {
        var valid = false
        if (name) {
            valid = name.length > 0 && this.allowedCharsRegex.test(name)
        }
        return valid
    }

    static validatePassword(password?: string): boolean {
        if (password) {
            return password.length === 0 || password.length >= UserValidator.minPasswordLength
        }
        return true
    }
}