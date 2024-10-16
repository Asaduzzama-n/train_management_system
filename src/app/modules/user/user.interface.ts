import { Model, Types } from 'mongoose'

export type IUser = {
  firstName: string
  lastName: string
  email: string
  password: string
  phone: number
  role: string
  avatar: string
  dateOfBirth: Date
  walletId: Types.ObjectId
}

export interface IUserWithId extends IUser {
  _id: string
}

export interface IUserMethods {
  isUserExists(
    email: string,
  ): Promise<Pick<
    IUserWithId,
    '_id' | 'email' | 'role' | 'firstName' | 'password'
  > | null>

  isPasswordMatched(
    givenPassword: string,
    hashedPassword: string,
  ): Promise<boolean>
}

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>

export interface IUserFilters {
  searchTerm?: string
  email?: string
  firstName?: string
  lastName?: string
}
