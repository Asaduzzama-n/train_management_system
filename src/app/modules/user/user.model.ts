import { model, Schema } from 'mongoose'
import { IUser, IUserMethods, IUserWithId, UserModel } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../../config'

export const userSchema = new Schema<
  IUser,
  Record<string, unknown>,
  UserModel,
  IUserMethods
>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    phone: { type: Number },
    role: { type: String, required: true },
    avatar: { type: String },
    dateOfBirth: { type: Date },
    walletId: { type: Schema.Types.ObjectId, ref: 'Wallet', required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

userSchema.methods.isUserExists = async (
  email: string,
): Promise<Pick<
  IUserWithId,
  '_id' | 'email' | 'role' | 'firstName' | 'password'
> | null> => {
  return await User.findOne(
    { email: email },
    { _id: 1, email: 1, role: 1, firstName: 1, password: 1 },
  )
}

userSchema.methods.isPasswordMatched = async (
  givenPassword: string,
  hashedPassword: string,
) => {
  return await bcrypt.compare(givenPassword, hashedPassword)
}

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcryptSaltRounds),
  )
  next()
})

export const User = model<IUser, UserModel>('User', userSchema)
