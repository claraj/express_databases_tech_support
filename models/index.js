const { Sequelize } = require('sequelize')

const configuration = {
    'storage': 'ticket.sqlite',
    'dialect': 'sqlite'
}

const sequelizeDatabase = new Sequelize(configuration)

const models = {}

const createTicketModel = require('./ticket')
const ticketModel = createTicketModel(sequelizeDatabase)

const ticketModelName = ticketModel.name 
models[ticketModelName] = ticketModel    //  { 'Ticket': the ticket model info}

module.exports = models 