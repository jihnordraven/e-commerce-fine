'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.renameColumn('users', 'created_at', 'createdAt')
		await queryInterface.renameColumn('users', 'updated_at', 'updatedAt')
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.renameColumn('users', 'createdAt', 'created_at')
		await queryInterface.renameColumn('users', 'updatedAt', 'updated_at')
	}
}
