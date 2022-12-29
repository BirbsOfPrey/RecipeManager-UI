// Claim objects received from Authentication server
export class Claim {
    type?: string
    value?: string
}

export namespace ClaimTypes {
    export const Role = "role"
    export const SessionExpiry = "bff:session_expires_in"
    export const LogoutUrl = "bff:logout_url"
}