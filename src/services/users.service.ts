import { IUser } from '../database/interfaces/IUser'
import db from '../database/models'

/**
 * @export
 * @function getUsers
 * @returns {Object} object
 */
export const registerUsers = async (user: IUser): Promise<IUser> => {
  const createUsers = (await db.User.create(user)) as IUser
  return createUsers
}

export const loginUser = async (user: { email: string; password: string }): Promise<any> => {
  const fetchedUser = await db.User.findOne({ where: { email: user.email } })
  return fetchedUser
}
