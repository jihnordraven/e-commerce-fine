'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('products', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false
			},
			description: {
				type: Sequelize.STRING,
				allowNull: false
			},
			price: {
				type: Sequelize.STRING,
				allowNull: false
			},
			category: {
				type: Sequelize.STRING,
				allowNull: false
			},
			currency: {
				type: Sequelize.STRING,
				allowNull: false
			},
			payWay: {
				type: Sequelize.STRING,
				allowNull: false
			},

			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'users',
					key: 'id'
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE'
			},

			categoryId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'categories',
					key: 'id'
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE'
			}
		})
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('products')
	}
}
