
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

rideRouter.get('/all', async (request, response) => {

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if(!token || !decodedToken.email) {
      return response.status(401).json({ error: 'token missing or invalid' })
  }

  const rides = await Ride.find({})

  response.json(rides)

})

rideRouter.post('/:rideId/stop', async (request,response) => {

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if(!token || !decodedToken.email) {
      return response.status(401).json({ error: 'token missing or invalid' })
  }

  const filter = { _id: request.params.rideId}
  const update = { status : 'done'}

  const stoppedRide = await Ride.findOneAndUpdate(filter,update, {
    new: true
  })

  response.json(stoppedRide.toJSON())
})



rideRouter.post('/:rideId/:driverId', async (request, response) => {

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if(!token || !decodedToken.email) {
      return response.status(401).json({ error: 'token missing or invalid' })
  }

  const passengerOnRide = await Ride.find({ passenger : request.params.rideId, status : 'ongoing'})

  if(passengerOnRide){
    return response.status(401).json({ error: 'passenger ride is ongoing' })

  }

  const driverOnRide = await Ride.find({ driver : request.params.driverId, status : 'ongoing'})

  if(driverOnRide){
    return response.status(401).json({ error: 'driver ride is ongoing' })

  }

  const passenger = await Passenger.findById(request.params.rideId)
  const driver = await Driver.findById(request.params.driverId)

  if(driver.suspended === true) {
    return response.status(401).json({ error: 'driver is currently suspended'})
  }

  const ride = new Ride({
      pickupPoint: body.pickupPoint,
      destinationPoint: body.destinationPoint,
      status: 'ongoing',
      passenger: passenger._id,
      driver : driver._id

  })

  const savedRide = await ride.save()
  
  passenger.rides = passenger.rides.concat(savedRide._id)
  await passenger.save()

  driver.rides = driver.rides.concat(savedRide.id)
  await driver.save()

  response.json(savedRide.toJSON())
})

module.exports = rideRouter