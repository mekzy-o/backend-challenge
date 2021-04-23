/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, NextFunction } from 'express'
import { check, validationResult, param } from 'express-validator'

const validate = {
  signup: [
    check('email')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Email is required')
      .isEmail()
      .trim()
      .withMessage('Please input a valid email address'),
    check('username')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Username name is required')
      .trim()
      .isLength({ min: 3, max: 15 })
      .withMessage('Username name must be between 3 to 15 characters'),
    check('password')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Password is required')
      .trim()
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters'),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req)
      const errorMessage: any = {}
      if (!errors.isEmpty()) {
        errors.array({ onlyFirstError: true }).forEach((error: any) => {
          errorMessage[error.param] = error.msg
        })
        return res.status(400).json({
          errors: errorMessage
        })
      }
      return next()
    }
  ],
  signin: [
    check('email')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Email is required')
      .isEmail()
      .trim()
      .withMessage('Please input a valid email address'),
    check('password')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Password is required')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters'),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req)
      const errorMessage: any = {}
      if (!errors.isEmpty()) {
        errors.array({ onlyFirstError: true }).forEach(error => {
          errorMessage[error.param] = error.msg
        })
        return res.status(400).json({
          errors: errorMessage
        })
      }
      return next()
    }
  ]
}

export default validate
