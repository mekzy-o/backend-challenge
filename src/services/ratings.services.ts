import db from '../database/models'
import { RatingInstance } from '../database/models/rating'

/**
 * @export
 * @function createRating
 * @returns {Object} object
 */
export const createRating = async (rating: RatingInstance): Promise<RatingInstance> => {
  const addRating = (await db.Rating.create(rating)) as RatingInstance
  return addRating
}
