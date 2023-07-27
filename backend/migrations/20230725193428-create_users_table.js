'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('users', {
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
			email: {
				type: Sequelize.STRING,
				allowNull: false
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false
			},
			age: {
				type: Sequelize.INTEGER,
				allowNull: true
			},
			country: {
				type: Sequelize.STRING,
				allowNull: true
			},
			city: {
				type: Sequelize.STRING,
				allowNull: true
			},
			phone: {
				type: Sequelize.STRING,
				allowNull: true
			},
			status: {
				type: Sequelize.STRING,
				allowNull: true
			},
			imagePath: {
				type: Sequelize.STRING,
				allowNull: true
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false
			}
		})
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('users')
	}
}
