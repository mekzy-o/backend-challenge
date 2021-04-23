import { Router } from 'express'
import welcomeRoute from './welcome.router'
import usersRouter from './users.router'
import questionRoutes from './questions.routes'

const routes = Router()

routes.use('/', welcomeRoute)
routes.use('/users', usersRouter)
routes.use('/questions', questionRoutes)

export default routes
