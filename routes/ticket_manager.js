const express = require('express')
const database = require('../models')
const Sequelize = require('sequelize')
const Ticket = database.Ticket

const router = express.Router()

// home page - form to add new ticket   
router.get('/', function(req, res, next) {
    res.render('new_ticket.hbs')
})

// list of open tickets  
router.get('/open-tickets', function(req, res, next) {
    Ticket.findAll( {where: {isOpen: true }}).then( (tickets) => {
        // tickets.forEach( t => console.log(t))
        return res.render('open_tickets.hbs', {tickets:tickets})
    } ).catch(err => next(err))
})

// list of closed (resolved) tickets
router.get('/closed-tickets', function(req, res, next) {
    Ticket.findAll( {where: {isOpen: false }}).then( (tickets) => {
        return res.render('closed_tickets.hbs', {tickets:tickets})
    } ).catch(err => next(err))
})


// request to add new ticket 
router.post('/add-new-ticket', function(req, res, next){
    console.log('BODY', req.body)
    
    Ticket.create(req.body).then( result => {
        // console.log('result', result)
        console.log('new ticket created')
        req.flash('success_messages', 'New ticket created')
        return res.redirect('/open-tickets')
    }).catch(err => {
        if (err instanceof Sequelize.ValidationError) {
            // tell user what is wrong 
            console.log('validaton error adding', err.errors)
            req.flash('error_messages', 'validation fail')
            // req.flash('error_messages', 'validation fail 2')
            return res.redirect('/')
        } else {
            console.log('another error adding')
        return next(err)
        }
    })
})


router.post('/close-ticket/:id', function(req, res, next) {
    //get ticket ID 
    const ticketID = req.params.id 
    Ticket.update({isOpen: false}, {where: {id: ticketID}}).then( result => { 
                req.flash('success_messages', `Ticket ${ticketID} closed`)

        return res.redirect('/closed-tickets')})
    .catch(err => next(err))

})

module.exports = router