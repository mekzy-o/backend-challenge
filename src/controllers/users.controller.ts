import { Request } from 'express'
import { loginUser, registerUsers } from '../services/users.service'
import { IUser } from '../database/interfaces/IUser'
import Helper from '../helpers/user.helpers'

const { createToken } = Helper

export const createUser = async (req: Request, res: any): Promise<IUser> => {
  try {
    const createUser = await registerUsers(req.body)
    if (!createUser) return res.status(400).json({ success: false, error: true, message: 'Account could not be created', data: null })
    const { email, username, updatedAt, createdAt } = createUser
    const token = createToken(createUser)

    return res.status(200).json({
      success: true,
      error: false,
      message: 'Account created successfully!',
      data: { user: { email, username, createdAt, updatedAt }, token }
    })
  } catch (error) {
    return res.status(500).json({ success: false, error: true, message: 'Server error', data: null })
  }
}

export const signInUser = async (req: Request, res: any): Promise<IUser> => {
  try {
    const signInUser = await loginUser(req.body)
    if (!signInUser) return res.status(400).json({ success: false, error: true, message: 'Email or Password is incorrect', data: null })
    const { email, username, updatedAt, createdAt } = signInUser
    const token = createToken(signInUser)

    return res
      .status(200)
      .json({ success: true, error: false, message: 'Login is successful!', data: { user: { email, username, updatedAt, createdAt }, token } })
  } catch (error) {
    return res.status(500).json({ success: false, error: true, message: 'Server error', data: null })
  }
}
