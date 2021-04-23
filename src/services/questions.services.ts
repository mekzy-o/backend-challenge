import db from '../database/models'
import { QuestionInstance } from '../database/models/question'

/**
 * @export
 * @function createQuestion
 * @returns {Object} object
 */
export const createQuestion = async (question: QuestionInstance): Promise<QuestionInstance> => {
  const createQuestion = (await db.Question.create(question)) as QuestionInstance
  return createQuestion
}

/**
 * @export
 * @function getAllQuestions
 * @returns {Object} object
 */
export const getAllQuestions = async (): Promise<any> => {
  const questions = (await db.Question.findAll({
    include: [
      {
        model: db.Answer,
        attributes: ['id', 'response']
      },
      {
        model: db.Rating,
        attributes: ['id', 'vote']
      }
    ]
  })) as any
  return questions
}

/**
 * @export
 * @function getAllQuestions
 * @returns {Object} object
 */
export const getSingleQuestion = async (id: string): Promise<any> => {
  const question = (await db.Question.findAll({
    where: {
      id
    },
    include: [
      {
        model: db.Answer,
        attributes: ['id', 'response']
      }
    ]
  })) as any
  return question
}

/**
 * @export
 * @function getAllQuestions
 * @returns {Object} object
 */
export const updateSingleQuestion = async (id: string, votes: number): Promise<any> => {
  const question = (await db.Question.update(
    { votes: votes },
    {
      where: {
        id
      }
    }
  )) as any
  return question
}
