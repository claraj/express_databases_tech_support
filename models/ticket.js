const { DataTypes } = require('sequelize')

module.exports = (sequelizeDatabase) => {
    const Ticket = sequelizeDatabase.define(
        'Ticket',
        {
            reporter: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [2, 100]
                }

            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [2, 1000]
                }
            },
            isOpen: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,  
                allowNull: false
            },
            dateReported: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false
            }
        }
    )

    Ticket.sync({force: false}).then( () => console.log('Synced ticket table'))

    return Ticket
}