import express from 'express'
import { AuthRoutes } from '../modules/auth/auth.route'
import { StationRoutes } from '../modules/station/stations.route'
import { TrainRoutes } from '../modules/train/train.route'
import { StopRoutes } from '../modules/stops/stops.route'
import { walletRoutes } from '../modules/wallet/wallet.route'
import { TransactionRoutes } from '../modules/transaction/transaction.route'
import { TicketRoutes } from '../modules/ticket/ticket.route'
import { UserRoutes } from '../modules/user/user.route'

const router = express.Router()

const routes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
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
  {
    path: '/ticket',
    route: TicketRoutes,
  },
]

routes.forEach(route => router.use(route.path, route.route))
export default router
