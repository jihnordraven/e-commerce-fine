'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('pay_way', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			en: {
				type: Sequelize.STRING,
				allowNull: false
			},
			ua: {
				type: Sequelize.STRING,
				allowNull: false
			},
			ru: {
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

		await queryInterface.addColumn('products', 'payWay', {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'pay_way',
				key: 'id'
			},
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		})
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('pay_way')
		await queryInterface.removeColumn('products', 'payWay')
	}
}
