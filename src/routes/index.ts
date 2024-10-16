import express from 'express'
import { AuthRoutes } from '../app/modules/auth/auth.route'
import { StationRoutes } from '../app/modules/station/stations.route'
import { TrainRoutes } from '../app/modules/train/train.route'
import { StopRoutes } from '../app/modules/stops/stops.route'
import { walletRoutes } from '../app/modules/wallet/wallet.route'
import { TransactionRoutes } from '../app/modules/transaction/transaction.route'

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
  {
    path: '/train',
    route: TrainRoutes,
  },
  {
    path: '/stop',
    route: StopRoutes,
  },
  {
    path: '/wallet',
    route: walletRoutes,
  },
  {
    path: '/transaction',
    route: TransactionRoutes,
  },
]

routes.forEach(route => router.use(route.path, route.route))
export default router
