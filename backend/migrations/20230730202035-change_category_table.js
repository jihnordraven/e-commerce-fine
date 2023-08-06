'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn('categories', 'en', {
			type: Sequelize.STRING,
			allowNull: false
		})
		await queryInterface.addColumn('categories', 'ua', {
			type: Sequelize.STRING,
			allowNull: false
		})
		await queryInterface.addColumn('categories', 'ru', {
			type: Sequelize.STRING,
			allowNull: false
		})
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn('categories', 'en')
		await queryInterface.removeColumn('categories', 'ua')
		await queryInterface.removeColumn('categories', 'ru')
	}
}
