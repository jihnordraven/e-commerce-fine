'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('product_image', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			imageUrl: {
				type: Sequelize.STRING,
				allowNull: false
			},
			productId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'products',
					key: 'id'
				},
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE'
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
		await queryInterface.dropTable('product_image')
	}
}
