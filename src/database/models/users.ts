import * as Sequelize from 'sequelize'
import bcrypt from 'bcrypt'

import { SequelizeAttributes } from '../../types/databaseTypes'

export interface UserAttributes {
  id?: number
  username: string
  email: string
  password: string
  createdAt?: Date
  updatedAt?: Date
}

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {}

export const UserModel = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<UserInstance, UserAttributes> => {
  const attributes: SequelizeAttributes<UserAttributes> = {
    username: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }

  const User = sequelize.define<UserInstance, UserAttributes>('user', attributes)

  User.beforeCreate(async user => {
    const salt = await bcrypt.genSaltSync()
    user.password = await bcrypt.hashSync(user.password, salt)
  })

  User.associate = models => {}

  return User
}
