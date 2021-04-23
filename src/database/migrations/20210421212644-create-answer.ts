'use strict'
module.exports = {
  //@ts-ignore
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    return queryInterface.createTable('answers', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()')
      },
      response: {
        allowNull: {
          args: false,
          msg: 'Please enter answer to question'
        },
        type: Sequelize.STRING
      },
      questionId: {
        allowNull: false,
        type: Sequelize.DataTypes.UUID,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'questions',
          key: 'id'
        }
      },
      userId: {
        allowNull: false,
        type: Sequelize.DataTypes.UUID,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    })
  },
  //@ts-ignore
  down: queryInterface => queryInterface.dropTable('answers')
}
