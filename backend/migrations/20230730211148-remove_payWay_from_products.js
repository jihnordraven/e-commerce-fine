'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.removeColumn('products', 'payWay')
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.addColumn('products', 'payWay', {
			type: Sequelize.STRING,
			allowNull: false
		})
	}
}
