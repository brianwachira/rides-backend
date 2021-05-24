const jwt = require('jsonwebtoken')
const ridesRouter = require('express').Router()
const Rides = require('../models/ride')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }
ridesRouter.get('/all', async (request, response) => {

    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
  
    if(!token || !decodedToken.email) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
  
    const allRides = await Rides.find({}).populate( 'passenger driver', { id: 1, name:1, phoneNumber: 1})
  
    response.json(allRides)
  
  })

ridesRouter.get("/ongoing", async (request, response) => {

    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
  
    if(!token || !decodedToken.email) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const ongoingRides = await Rides.find({ status : 'ongoing'}).populate( 'passenger driver', { id: 1, name:1, phoneNumber: 1})

    response.json(ongoingRides)
})

ridesRouter.get("/done", async (request,response) => {

    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
  
    if(!token || !decodedToken.email) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }


    const doneRides = await Rides.find({ status : 'done'}).populate( 'passenger driver', { id: 1, name:1, phoneNumber: 1})

    response.json(doneRides)

})

module.exports = ridesRouter

