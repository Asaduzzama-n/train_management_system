import { Model } from 'mongoose'

export type IStation = {
  name: string
  stationCode: string
  location: {
    latitude: string
    longitude: string
  }
  description: string
}

export type IStationModel = Model<IStation, Record<string, unknown>>
