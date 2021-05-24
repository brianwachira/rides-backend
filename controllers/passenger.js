const { request, response } = require('express')
const jwt = require('jsonwebtoken')
const Passenger = require('../models/passenger')
const passengerRouter = require('express').Router()

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }


passengerRouter.get('/all', async (request, response) => {

    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
  
    if(!token || !decodedToken.email) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const passengers = await Passenger.find({}).populate('rides', {pickupPoint: 1, destinationPoint: 1,driver : 1, status: 1})

    response.json(passengers)
})
  
passengerRouter.post('/', async (request, response) => {
    const body = request.body
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if(!token || !decodedToken.email) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const passenger = new Passenger({
        name: body.name,
        phoneNumber: body.phoneNumber
    })

    const savedPassenger = await passenger.save()

    response.json(savedPassenger)

})
module.exports = passengerRouter