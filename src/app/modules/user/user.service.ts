import { userSearchableFields } from './user.constants'
import { IUser, IUserFilters } from './user.interface'
import { User } from './user.model'

const getAllUser = async (
  filters: Partial<IUserFilters>,
): Promise<IUser[] | null> => {
  const { searchTerm, ...filtersData } = filters

  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: userSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const user = await User.find(whereConditions).populate('walletId').lean()
  if (!user) throw new Error('Failed to retrieve users')
  return user
}

const getSingleUser = async (email: string): Promise<IUser | null> => {
  const user = await User.findOne({ email }).populate('walletId').lean()
  if (!user) throw new Error('User does not exist')
  return user
}

const updateUser = async (
  id: string,
  payload: Partial<IUser>,
): Promise<IUser | null> => {
  const isUserExist = await User.findById(id)
  if (!isUserExist) {
    throw new Error('User does not exist')
  }
  const user = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  if (!user) throw new Error('Failed to update user')
  return user
}

const deleteUser = async (id: string): Promise<IUser | null> => {
  const userObj = new User()
  const isUserExist = await userObj.isUserExists(id)
  if (!isUserExist) {
    throw new Error('User does not exist')
  }
  const user = await User.findByIdAndDelete(id)
  if (!user) throw new Error('Failed to delete user')
  return user
}

export const UserService = {
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
}
