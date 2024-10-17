// schedule.service.ts
import cron from 'node-cron'
import { Train } from '../train.model'
import { Schedule } from './schedule.model'
import { Types } from 'mongoose'

const createTrainSchedules = async () => {
  try {
    const trains = await Train.find()
      .populate({
        path: 'stops',
        populate: { path: 'stationId', select: 'name stationCode' },
        select: 'departureTime arrivalTime',
      })
      .lean()

    for (const train of trains) {
      const schedule = {
        trainId: train._id,
        trainName: train.trainName,
        trainCode: train.trainCode,
        stops: [] as Types.ObjectId[], // Ensure this is an array of ObjectIds
      }

      // Add all stop ObjectIds to the schedule
      for (const stop of train.stops) {
        // @ts-ignore
        schedule.stops.push(stop.stationId._id as Types.ObjectId) // Only push ObjectIds
      }

      // Check if the schedule already exists
      const existingSchedule = await Schedule.findOne({ trainId: train._id })

      if (existingSchedule) {
        existingSchedule.stops = schedule.stops // This will be an array of ObjectIds
        await existingSchedule.save()
      } else {
        const newSchedule = new Schedule(schedule)
        await newSchedule.save()
      }
    }

    console.log('Train schedules created/updated successfully.')
    return trains
  } catch (error) {
    console.error('Error creating/updating train schedules:', error)
  }
}

// Schedule to run every 24 hours at 8:00 AM
cron.schedule('0 8 * * *', createTrainSchedules)
console.log('Schedule created')
// Run immediately to populate schedules on startup
createTrainSchedules()
