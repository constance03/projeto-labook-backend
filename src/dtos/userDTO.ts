export interface TSignupInputDTO {
    name: unknown,
    email: unknown,
    password: unknown
}

export interface TSignupOutputDTO {
    token: string
}

export interface TLoginInputDTO {
    email: unknown,
    password: unknown
}

export interface TLoginOutputDTO {
    token: string
}