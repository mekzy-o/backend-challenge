import db from '../database/models'
import { AnswerInstance } from '../database/models/answer'

/**
 * @export
 * @function createQuestion
 * @returns {Object} object
 */
export const addAnswer = async (answer: AnswerInstance): Promise<AnswerInstance> => {
  const createQuestion = (await db.Answer.create(answer)) as AnswerInstance
  return createQuestion
}
