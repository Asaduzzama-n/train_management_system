import { z } from 'zod'

export const createStationZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    location: z.string({ required_error: 'Location is required' }),
    description: z.string({ required_error: 'Description is required' }),
  }),
})

export const updateStationZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    location: z.string().optional(),
    description: z.string().optional(),
  }),
})

export const StationValidation = {
  createStationZodSchema,
  updateStationZodSchema,
}
