import { userFilterableFields } from './user.constants'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { UserService } from './user.service'
import { IUser } from './user.interface'
import pick from '../../../shared/pick'

const getAllUser = catchAsync(async (req, res) => {
  const filters = pick(req.query, userFilterableFields)
  const result = await UserService.getAllUser(filters)
  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully!',
    data: result,
  })
})

const getSingleUser = catchAsync(async (req, res) => {
  const { email } = req.params
  const result = await UserService.getSingleUser(email)
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully!',
    data: result,
  })
})

const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params
  const { ...updatedData } = req.body
  const result = await UserService.updateUser(id, updatedData)
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully!',
    data: result,
  })
})

const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await UserService.deleteUser(id)
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully!',
    data: result,
  })
})

export const UserController = {
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
}
