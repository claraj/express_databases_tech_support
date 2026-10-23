const { Sequelize } = require('sequelize')
const configJson = require('../db_config.json')

const environment = process.env.NODE_ENV || 'development'

const dbPassword = process.env.DB_PASSWORD

const config = configJson[environment]
config.password = dbPassword

const sequelizeDatabase = new Sequelize(config)

const database = {}

const createTicketModel = require('./ticket')

const ticketModel = createTicketModel(sequelizeDatabase)

const ticketModelName = ticketModel.name 
database[ticketModelName] = ticketModel    //  { 'Ticket': the ticket model info}

module.exports = database 