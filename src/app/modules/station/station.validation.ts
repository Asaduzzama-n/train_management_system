import { z } from 'zod'

export const createStationZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    stationCode: z.string({ required_error: 'Station code is required' }),
    location: z.object({
      latitude: z.string({ required_error: 'Latitude is required' }),
      longitude: z.string({ required_error: 'Longitude is required' }),
    }),
    description: z.string({ required_error: 'Description is required' }),
  }),
})

export const updateStationZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    stationCode: z.string().optional(),
    location: z
      .object({
        latitude: z.string().optional(),
        longitude: z.string().optional(),
      })
      .optional(),
    description: z.string().optional(),
  }),
})

export const StationValidation = {
  createStationZodSchema,
  updateStationZodSchema,
}
