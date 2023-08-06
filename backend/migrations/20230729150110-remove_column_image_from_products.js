'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.removeColumn('products', 'image')
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.addColumn('products', 'image', {
			type: Sequelize.STRING,
			allowNull: true
		})
	}
}
