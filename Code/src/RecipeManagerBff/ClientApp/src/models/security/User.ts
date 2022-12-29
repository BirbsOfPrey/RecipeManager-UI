export class User {
    id?: string
    name?: string
    firstName?: string
    familyName?: string
    oldPassword?: string
    newPassword?: string
    email?: string
    role?: string
}

export function createUser() {
    return new User()
}