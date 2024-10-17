import { z } from 'zod'
import { Types } from 'mongoose'

const createWalletZodSchema = z.object({
  body: z.object({
    balance: z
      .number({ required_error: 'Balance is required' })
      .nonnegative('Balance must be a positive number'),
  }),
})

const depositWalletZodSchema = z.object({
  body: z.object({
    amount: z
      .number({ required_error: 'Amount is required' })
      .nonnegative('Amount must be a positive number'),
    walletId: z
      .string({ required_error: 'Wallet ID is required' })
      .refine(id => Types.ObjectId.isValid(id), {
        message: 'Invalid Wallet ID format',
      }),
    transactionType: z.enum(['deposit', 'ticket']),
  }),
})
const updateWalletZodSchema = z.object({
  body: z
    .object({
      balance: z
        .number({ invalid_type_error: 'Balance must be a number' })
        .nonnegative('Balance must be a positive number')
        .optional(),
    })
    .partial(),
})

export const WalletValidation = {
  createWalletZodSchema,
  depositWalletZodSchema,
  updateWalletZodSchema,
}
