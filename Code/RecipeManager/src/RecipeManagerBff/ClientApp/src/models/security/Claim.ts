// Claim objects received from Authentication server
export class Claim {
    type?: string
    value?: string
}

export namespace ClaimTypes {
    export const Role = "role"
    export const LogoutUrl = "bff:logout_url"
}