export interface IUser {
    firstName: string
    lastName: string
    email: string
    password: string
    isAdm: boolean
    createdAt: Date
    updatedAt: Date
}

export interface ICourse {
    courseName: string
    duration: string
}