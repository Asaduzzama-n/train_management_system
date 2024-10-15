import { model, Schema } from 'mongoose'
import { IWallet, IWalletModel } from './wallet.interface'

export const walletSchema = new Schema<
  IWallet,
  Record<string, unknown>,
  IWalletModel
>(
  {
    balance: { type: Number, required: true, default: 0 },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const Wallet = model<IWallet, IWalletModel>('Wallet', walletSchema)
