/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import db from '../database/models'

config()

export interface IGetUserAuthInfoRequest extends Request {
  user: any
}

/**
 * @description Handles access token verification
 * @param {string} token - The user payload
 * @return {object} access token values
 */
export const verifyToken = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction): any => {
  try {
    const bearer = req.headers.authorization
    if (!bearer) {
      return res.status(401).json({ success: false, error: true, message: 'No token provided' })
    }

    const token = bearer.split(' ')[1]
    jwt.verify(token, process.env.SECRET_KEY as any, (err: any, decoded: any) => {
      if (err) {
        return res.status(401).json({
          success: false,
          error: true,
          message: 'Invalid token provided'
        })
      }
      req.user = decoded
      return next()
    })
  } catch (err) {
    return next(err)
  }
}

/**
 * TODO: combine check for email and username in one function,
 *for some wierd reasons sequelize [Op.or] didn't work
 */

 /**
 * @export
 * @function checkEmail
 * @returns {Object} object
 */
export const checkEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body
    const getUser: any = await db.User.findOne({ where: { email } })
    if (getUser) {
      return res.status(200).json({
        success: false,
        error: true,
        message: 'Email already exist on our database',
        data: null
      })
    }
    return next()
  } catch (err) {
    return next(err)
  }
}

/**
 * @export
 * @function checkUsername
 * @returns {Object} object
 */
export const checkUsername = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username } = req.body
    const getUser: any = await db.User.findOne({ where: { username } })
    if (getUser) {
      return res.status(200).json({
        success: false,
        error: true,
        message: 'Username already exist on our database',
        data: null
      })
    }
    return next()
  } catch (err) {
    return next(err)
  }
}
