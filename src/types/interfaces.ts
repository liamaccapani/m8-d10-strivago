export interface User {
    accessToken?: string
    name: string
    surname: string
    username: string
    password: string
    role: string
    _id: string
}

export interface UserDocument {
    name: string
    surname: string
    username: string
    password: string
    role: string 
}