import express from 'express'
import { AuthRoutes } from '../app/modules/auth/auth.route'
import { StationRoutes } from '../app/modules/station/stations.route'

const router = express.Router()

const routes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/station',
    route: StationRoutes,
  },
]

routes.forEach(route => router.use(route.path, route.route))
export default router
