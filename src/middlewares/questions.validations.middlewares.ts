/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, NextFunction } from 'express'
import { check, validationResult } from 'express-validator'

const validate = {
  question: [
    check('title').not().isEmpty().withMessage('question title of question is required'),
    check('body').not().isEmpty().withMessage(' question body is required'),
    (req: Request, res: Response, next: NextFunction) => {
      const errors: any = validationResult(req)
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

  answer: [
    check('response').not().isEmpty().withMessage('response of question is required'),
    (req: Request, res: Response, next: NextFunction) => {
      const errors: any = validationResult(req)
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
}

export default validate
