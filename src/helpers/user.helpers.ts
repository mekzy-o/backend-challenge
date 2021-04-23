/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import jwt, { verify } from 'jsonwebtoken'
// import { hashSync, compareSync } from 'bcryptjs'
import { config } from 'dotenv'

config()

/**
 * Handles access token generation and verification
 */
class Helper {
  /**
   * @description Handles access token generation
   * @param {object} payload - The user credential {id, isAdmin}
   * @return {string} access token
   */
  static createToken(payload: any): any {
    return jwt.sign(JSON.parse(JSON.stringify(payload)), process.env.SECRET_KEY as any, { expiresIn: '24d' })
  }

  /*
   * @description Handles access token verification
   * @param {string} token - The user credential {id, isAdmin}
   * @return {object} access token values
   */
  static verifyToken(token: any): any {
    return verify(token, process.env.SECRET_KEY as any)
  }

  /**
   * @method hashPassword
   * @description Hashes the user inputed password
   * @param {string} password - The user password to be hashed
   * @returns {string} A string of the hashed password
   */
  // static hashPassword(password: string): string {
  //   return hashSync(password, 10)
  // }

  /**
   * @method comparePassword
   * @description compares the user inputed password with hashPassword
   * @param {string} password - The user password to be compared
   * @param {string} hashPassword - The hashed password in the database
   * @returns {string} A hashed password
   */
  // static comparePassword(password: string, hashPassword: string): string {
  //   return compareSync(password, hashPassword)
  // }

  /**
   * @method hashUserData
   * @description Hashes the user inputed password
   * @param {string} user - The user password to be hashed
   * @returns {string} A string of the hashed password
   */
  // static hashUserData(user: string): string {
  //   return hashSync(user, 10)
  // }
}

export default Helper
