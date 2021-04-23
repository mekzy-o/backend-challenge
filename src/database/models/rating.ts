import * as Sequelize from 'sequelize'

import { SequelizeAttributes } from '../../types/databaseTypes'

export interface RatingAttributes {
  id?: string
  vote: string
  questionId: string
  userId: string
  createdAt?: Date
  updatedAt?: Date
}

export interface RatingInstance extends Sequelize.Instance<RatingAttributes>, RatingAttributes {}

export const RatingModel = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<RatingInstance, RatingAttributes> => {
  const attributes: SequelizeAttributes<RatingAttributes> = {
    vote: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: ['upvote', 'downvote']
    },
    questionId: {
      allowNull: false,
      type: DataTypes.UUID
    },
    userId: {
      allowNull: false,
      type: DataTypes.UUID
    }
  }

  const Ratings = sequelize.define<RatingInstance, RatingAttributes>('rating', attributes)

  Ratings.associate = models => {
    Ratings.belongsTo(models.Question, {
      foreignKey: 'questionId',
      as: 'voteCount'
    })
  }

  return Ratings
}
