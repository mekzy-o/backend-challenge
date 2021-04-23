/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response } from 'express'
import { createQuestion, getAllQuestions, getSingleQuestion, updateSingleQuestion } from '../services/questions.services'
import { IGetUserAuthInfoRequest } from '../middlewares/users.middlewares'
import { QuestionAttributes } from '../database/models/question'
import { QuestionInterface } from '../types/questionTypes'
import { createRating } from '../services/ratings.services'
import { RatingAttributes } from '../database/models/rating'
import { AnswerAttributes } from '../database/models/answer'
import { addAnswer } from '../services/answers.services'

/**
 * @export
 * @function fetchAllQuestions
 * @returns {Object} object
 */
export const fetchAllQuestions = async (_req: Request, res: any): Promise<QuestionInterface[]> => {
  try {
    const questions = await getAllQuestions()
    if (!questions) res.status(404).send({ err: 'No Questions Found' })
    return res.status(200).json({ success: true, error: false, message: 'Questions fetched successfully', data: questions })
  } catch (error) {
    return res.status(500).json({ success: false, error: true, message: 'Server error', data: null })
  }
}

/**
 * @export
 * @function fetchSingleQuestion
 * @returns {Object} object
 */
export const fetchSingleQuestion = async (_req: Request, res: any): Promise<QuestionInterface[]> => {
  try {
    const { id } = _req.params
    const question = await getSingleQuestion(id)
    if (!question) res.status(404).json({ success: true, error: false, message: 'No Question Found with that Id', data: null })
    return res.status(200).json({ success: true, error: false, message: 'Question fetched successfully', data: question })
  } catch (error) {
    return res.status(500).json({ success: false, error: true, message: 'Server error', data: null })
  }
}

/**
 * @export
 * @function createQuestions
 * @returns {Object} object
 */
export const createQuestions = async (req: IGetUserAuthInfoRequest, res: Response): Promise<any> => {
  try {
    const { id } = req.user
    const { title, body } = req.body
    const payload: QuestionAttributes = { userId: id, title, body }
    const addQuestion = await createQuestion(payload as any)
    if (!addQuestion) return res.status(400).json({ success: false, error: true, message: 'Error creating question', data: null })
    return res.status(200).json({ success: true, error: false, message: 'Question created successfully!', data: addQuestion })
  } catch (error) {
    return res.status(500).json({ success: false, error: true, message: 'Server error', data: null })
  }
}

/**
 * @export
 * @function upvoteQuestions
 * @returns {Object} object
 */
export const upvoteQuestion = async (req: IGetUserAuthInfoRequest, res: Response): Promise<any> => {
  try {
    const { id } = req.user
    const { id: questionId } = req.params
    const getQuestion = await getSingleQuestion(questionId)
    getQuestion[0].dataValues.votes += 1
    const updateQuestion = await updateSingleQuestion(questionId, getQuestion[0].votes)

    //Track ratings
    const payload: RatingAttributes = { userId: id, vote: 'upvote', questionId }
    const rating = await createRating(payload as any)
    if (!rating && !getQuestion) return res.status(400).json({ success: false, error: true, message: 'Error rating question', data: null })
    return res.status(200).json({ success: true, error: false, message: 'You upvoted question successfully!', data: getQuestion })
  } catch (error) {
    return res.status(500).json({ success: false, error: true, message: 'Server error', data: null })
  }
}

/**
 * @export
 * @function downvoteQuestions
 * @returns {Object} object
 */
export const downvoteQuestion = async (req: IGetUserAuthInfoRequest, res: Response): Promise<any> => {
  try {
    const { id } = req.user
    const { id: questionId } = req.params
    const getQuestion = await getSingleQuestion(questionId)
    getQuestion[0].dataValues.votes -= 1
    const updateQuestion = await updateSingleQuestion(questionId, getQuestion[0].votes)

    //Track ratings
    const payload: RatingAttributes = { userId: id, vote: 'downvote', questionId }
    const rating = await createRating(payload as any)
    if (!rating && !getQuestion) return res.status(400).json({ success: false, error: true, message: 'Error rating question', data: null })
    return res.status(200).json({ success: true, error: false, message: 'You downvoted question successfully!', data: getQuestion })
  } catch (error) {
    return res.status(500).json({ success: false, error: true, message: 'Server error', data: null })
  }
}

/**
 * @export
 * @function answerQuestion
 * @returns {Object} object
 */
export const answerQuestion = async (req: IGetUserAuthInfoRequest, res: Response): Promise<any> => {
  try {
    const { id } = req.user
    const { response } = req.body
    const { id: questionId } = req.params
    const payload: AnswerAttributes = { userId: id, response, questionId }
    const addQuestion = await addAnswer(payload as any)
    const getQuestion = await getSingleQuestion(questionId)
    if (!addQuestion && getQuestion) return res.status(400).json({ success: false, error: true, message: 'Error answering question', data: null })
    return res.status(200).json({ success: true, error: false, message: 'Answer was added to Question successfully!', data: getQuestion })
  } catch (error) {
    return res.status(500).json({ success: false, error: true, message: 'Server error', data: null })
  }
}
