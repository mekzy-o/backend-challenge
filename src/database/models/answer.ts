import * as Sequelize from 'sequelize'

import { SequelizeAttributes } from '../../types/databaseTypes'

export interface AnswerAttributes {
  id?: number
  response: string
  questionId: string
  userId: string
  createdAt?: Date
  updatedAt?: Date
}

export interface AnswerInstance extends Sequelize.Instance<AnswerAttributes>, AnswerAttributes {}

export const AnswerModel = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<AnswerInstance, AnswerAttributes> => {
  const attributes: SequelizeAttributes<AnswerAttributes> = {
    response: {
      allowNull: false,
      type: DataTypes.STRING
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

  const Answer = sequelize.define<AnswerInstance, AnswerAttributes>('answer', attributes)

  Answer.associate = models => {
    Answer.belongsTo(models.Question, {
      foreignKey: 'questionId',
      as: 'answers'
    })
  }
  return Answer
}
