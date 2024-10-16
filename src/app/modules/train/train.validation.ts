import { z } from 'zod'

export const createTrainZodSchema = z.object({
  body: z.object({
    trainName: z.string({ required_error: 'Train Name is required' }),
    trainCode: z.string({ required_error: 'Train code is required' }),
    seats: z.number({ required_error: 'Train seats amount is required' }),
  }),
})

export const updateTrainZodSchema = z.object({
  body: z.object({
    trainName: z.string().optional(),
    trainCode: z.string().optional(),
    seats: z.number().optional(),
  }),
})

export const TrainValidation = {
  createTrainZodSchema,
  updateTrainZodSchema,
}
