import { Model } from 'mongoose'

export type IStation = {
  name: string
  stationCode: string
  location: string
  description: string
}

export type IStationModel = Model<IStation, Record<string, unknown>>
