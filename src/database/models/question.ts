import * as Sequelize from 'sequelize'

import { SequelizeAttributes } from '../../types/databaseTypes'

export interface QuestionAttributes {
  id?: string
  title: string
  body: string
  votes?: number
  userId: Sequelize.DataTypeUUID
  createdAt?: Date
  updatedAt?: Date
}

export interface QuestionInstance extends Sequelize.Instance<QuestionAttributes>, QuestionAttributes {}

export const QuestionModel = (
  sequelize: Sequelize.Sequelize,
  DataTypes: Sequelize.DataTypes
): Sequelize.Model<QuestionInstance, QuestionAttributes> => {
  const attributes: SequelizeAttributes<QuestionAttributes> = {
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    body: {
      allowNull: false,
      type: DataTypes.STRING
    },
    votes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    userId: {
      allowNull: false,
      type: DataTypes.UUID
    }
  }

  const Question = sequelize.define<QuestionInstance, QuestionAttributes>('question', attributes)

  Question.associate = models => {
    Question.hasMany(models.Answer)
    Question.hasMany(models.Rating)
  }

  return Question
}
