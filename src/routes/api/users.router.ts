import express from 'express'
import { createUser, signInUser } from '../../controllers/users.controller'
import validate from '../../middlewares/users.validations.middlewares'
import { checkEmail, checkUsername } from '../../middlewares/users.middlewares'

const userRoutes = express.Router()

userRoutes.post('/signup', validate.signup, checkEmail, checkUsername, createUser)
userRoutes.post('/login', validate.signin, signInUser)

export default userRoutes
