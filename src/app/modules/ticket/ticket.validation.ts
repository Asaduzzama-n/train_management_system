import { z } from 'zod'

const purchaseTicketZodSchema = z.object({
  body: z.object({
    trainId: z.string({ required_error: 'Train ID is required' }),
    fare: z.number().min(0, 'Fare must be a positive number').optional(),
    journeyDate: z.string({ required_error: 'Journey date is required' }),
  }),
})

const updateTicketZodSchema = z.object({
  body: z.object({
    trainId: z.string().optional(),
    fare: z.number().min(0, 'Fare must be a positive number').optional(),

    journeyDate: z.date().optional(),
    userId: z.string().optional(),
    status: z.enum(['active', 'cancelled']).optional(),
  }),
})

export const TicketValidation = {
  purchaseTicketZodSchema,
  updateTicketZodSchema,
}
