import { DataTypeAbstract, DefineAttributeColumnOptions } from 'sequelize'
import * as Sequelize from 'sequelize'

import { UserAttributes, UserInstance } from '../database/models/users'
import { QuestionAttributes, QuestionInstance } from '../database/models/question'
import { AnswerAttributes, AnswerInstance } from '../database/models/answer'
import { RatingAttributes, RatingInstance  } from '../database/models/rating'

type SequelizeAttribute = string | DataTypeAbstract | DefineAttributeColumnOptions

export type SequelizeAttributes<T extends { [key: string]: any }> = {
  [P in keyof T]: SequelizeAttribute
}

export interface DbInterface {
  sequelize: Sequelize.Sequelize
  Sequelize: Sequelize.SequelizeStatic
  User: Sequelize.Model<UserInstance, UserAttributes>
  Question: Sequelize.Model<QuestionInstance, QuestionAttributes>
  Answer: Sequelize.Model<AnswerInstance, AnswerAttributes>
  Rating: Sequelize.Model<RatingInstance, RatingAttributes>
}
