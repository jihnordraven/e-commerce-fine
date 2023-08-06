'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('currencies', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			currency: {
				type: Sequelize.STRING,
				allowNull: false
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

		await queryInterface.addColumn('products', 'currency_id', {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'currencies',
				key: 'id'
			},
			onDelete: 'CASCADE',
			onupdate: 'CASCADE'
		})
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('currencies')
	}
}
