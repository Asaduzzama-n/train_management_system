import { z } from 'zod'
import { Types } from 'mongoose'

const createWalletZodSchema = z.object({
  body: z.object({
    balance: z
      .number({ required_error: 'Balance is required' })
      .nonnegative('Balance must be a positive number'),
    userId: z
      .string({ required_error: 'User ID is required' })
      .refine(id => Types.ObjectId.isValid(id), {
        message: 'Invalid User ID format',
      }),
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
    userId: z
      .string({ required_error: 'User ID is required' })
      .refine(id => Types.ObjectId.isValid(id), {
        message: 'Invalid User ID format',
      }),
  }),
})
const updateWalletZodSchema = z.object({
  body: z
    .object({
      balance: z
        .number({ invalid_type_error: 'Balance must be a number' })
        .nonnegative('Balance must be a positive number')
        .optional(),
      userId: z
        .string({ invalid_type_error: 'User ID must be a string' })
        .optional()
        .refine(id => Types.ObjectId.isValid(id as string), {
          message: 'Invalid User ID format',
        }),
    })
    .partial(),
})

export const WalletValidation = {
  createWalletZodSchema,
  depositWalletZodSchema,
  updateWalletZodSchema,
}
