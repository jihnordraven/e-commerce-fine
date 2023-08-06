'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.removeColumn('products', 'currency')
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.addColumn('products', 'currency', {
			type: Sequelize.STRING,
			allowNull: false
		})
	}
}
