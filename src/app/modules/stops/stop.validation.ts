import { z } from 'zod'

const createStopZodSchema = z.object({
  body: z.object({
    stationId: z.string({ required_error: 'Station Id is required' }),
    trainId: z.string({ required_error: 'Train Id is required' }),
    departureTime: z.string({ required_error: 'Departure time is required' }),
    arrivalTime: z.string({ required_error: 'Arrival time is required' }),
  }),
})

const updateStopZodSchema = z.object({
  body: z.object({
    stationId: z.string().optional(),
    trainId: z.string().optional(),
    departureTime: z.string().optional(),
    arrivalTime: z.string().optional(),
  }),
})

export const StopValidation = {
  createStopZodSchema,
  updateStopZodSchema,
}
