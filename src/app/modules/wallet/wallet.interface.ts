import { Model, Types } from 'mongoose'

export type IWallet = {
  balance: number
  userId: Types.ObjectId
}

export type IWalletModel = Model<IWallet, Record<string, unknown>>
