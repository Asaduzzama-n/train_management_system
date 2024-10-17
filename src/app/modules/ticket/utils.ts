import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { Ticket } from './ticket.model'
import { Types } from 'mongoose'

export const checkTicketAvailability = async (
  trainId: Types.ObjectId,
  journeyDate: Date,
  trainSeats: number,
) => {
  const tickets = await Ticket.find({
    trainId: trainId,
    journeyDate: journeyDate,
  })

  if (!tickets) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No tickets found')
  }

  if (tickets.length >= trainSeats) {
    return false
  }

  return true
}

const EARTH_RADIUS = 6371

const parseCoordinate = (coordinate: string | number): number => {
  if (typeof coordinate === 'number') {
    return coordinate
  }

  const trimmedCoordinate = coordinate.trim()
  const degrees = parseFloat(trimmedCoordinate)
  const direction = trimmedCoordinate.slice(-1)

  return direction === 'S' || direction === 'W' ? -degrees : degrees
}

export const calculateDistance = (
  lat1: string | number,
  lon1: string | number,
  lat2: string | number,
  lon2: string | number,
): number => {
  // Parse coordinates
  const latitude1 = parseCoordinate(lat1)
  const longitude1 = parseCoordinate(lon1)
  const latitude2 = parseCoordinate(lat2)
  const longitude2 = parseCoordinate(lon2)

  const toRadians = (degree: number) => degree * (Math.PI / 180)

  const dLat = toRadians(latitude2 - latitude1)
  const dLon = toRadians(longitude2 - longitude1)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(latitude1)) *
      Math.cos(toRadians(latitude2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return EARTH_RADIUS * c // Distance in kilometers
}
