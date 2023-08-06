'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.renameColumn('products', 'userId', 'user_id')
		await queryInterface.renameColumn('products', 'payWay', 'payway_id')
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.renameColumn('products', 'user_id', 'userId')
		await queryInterface.renameColumn('products', 'payway_id', 'payWay')
	}
}
