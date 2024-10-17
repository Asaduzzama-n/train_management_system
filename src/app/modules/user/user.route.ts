import express from 'express'
import { UserController } from './user.controller'
import { auth } from '../../middleware/auth'
import { ENUM_USER_ROLE } from '../../../interfaces/user'

const router = express.Router()

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  UserController.updateUser,
)
router.get(
  '/:email',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  UserController.getSingleUser,
)
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
  UserController.deleteUser,
)
router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUser)

export const UserRoutes = router
