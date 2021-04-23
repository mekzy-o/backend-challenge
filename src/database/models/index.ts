import Sequelize from 'sequelize'
import { DbInterface } from '../../types/databaseTypes'
import { AnswerModel } from './answer'
import { QuestionModel } from './question'
import { RatingModel } from './rating'
import { UserModel } from './users'

const env = process.env.NODE_ENV || 'development'
const config = require('../config')[env]

const url = config.url || process.env.DATABSE_URL

const sequelize = new Sequelize(url, config)

const db: DbInterface = {
  sequelize,
  Sequelize,
  User: UserModel(sequelize, Sequelize),
  Question: QuestionModel(sequelize, Sequelize),
  Answer: AnswerModel(sequelize, Sequelize),
  Rating: RatingModel(sequelize, Sequelize)
}


Object.values(db).forEach((model: any) => {
  if (model.associate) {
    model.associate(db)
  }
})

export default db
