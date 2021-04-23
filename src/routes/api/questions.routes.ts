import express from 'express'
import { verifyToken } from '../../middlewares/users.middlewares'
import {
  createQuestions,
  fetchAllQuestions,
  fetchSingleQuestion,
  upvoteQuestion,
  downvoteQuestion,
  answerQuestion
} from '../../controllers/questions.controller'
import validate from '../../middlewares/questions.validations.middlewares'

const questionRoutes = express.Router()

questionRoutes.post('/', verifyToken as any, validate.question, createQuestions as any)
questionRoutes.get('/', fetchAllQuestions)
questionRoutes.get('/:id', fetchSingleQuestion)
questionRoutes.post('/:id/upvote', verifyToken as any, upvoteQuestion as any)
questionRoutes.post('/:id/downvote', verifyToken as any, downvoteQuestion as any)
questionRoutes.post('/:id/answer', verifyToken as any, validate.answer, answerQuestion as any)

export default questionRoutes
