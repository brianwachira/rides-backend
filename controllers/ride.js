const { request } = require('express')
const jwt = require('jsonwebtoken')
const rideRouter = require('express').Router()
const Ride = require('../models/ride')
const Passenger = require('../models/passenger')
const Driver = require('../models/driver')
const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }

rideRouter.post('/:rideId/:driverId', async (request, response) => {

    const body = request.body
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
  
    if(!token || !decodedToken.email) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
  
    const passenger = await Passenger.findById(request.params.rideId).populate(
      { 
        path: 'ride',
        match: { 
          status : { 
            $eq : 'ongoing'
          } 
        } 
      }
    )
    console.log(passenger)

    // const driver = await Driver.findById(request.params.driverId)

    // const ride = new Ride({
    //     pickupPoint: body.pickupPoint,
    //     destinationPoint: body.destinationPoint,
    //     status: 'ongoing',
    //     passenger: passenger,
    //     driver : driver

    // })
})
module.exports = rideRouter