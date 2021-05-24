const jwt = require('jsonwebtoken')
const driverRouter = require('express').Router()
const Driver = require('../models/driver')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }

driverRouter.get('/all', async (request, response) => {

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if(!token || !decodedToken.email) {
      return response.status(401).json({ error: 'token missing or invalid' })
  }

  const drivers = await Driver.find({}).populate('rides', {pickupPoint: 1, destinationPoint: 1, passenger : 1, status: 1})

  response.json(drivers.map(driver => driver.toJSON()))
})

driverRouter.post('/', async (request, response) => {
    const body = request.body
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if(!token || !decodedToken.email) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const driver = new Driver({
        name : body.name,
        phoneNumber : body.phoneNumber,
    })

    const savedDriver = await driver.save()

        
    response.json(savedDriver)
})

driverRouter.post('/:id/suspend', async (request, response) => {

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if(!token || !decodedToken.email) {
      return response.status(401).json({ error: 'token missing or invalid' })
  }
  
  const filter = { _id: request.params.id};
  const update = { suspended : true}

  await Driver.findOneAndUpdate(filter, update)

  response.status(204).end()

})

driverRouter.delete('/:id/suspend', async (request, response) => {

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if(!token || !decodedToken.email) {
      return response.status(401).json({ error: 'token missing or invalid' })
  }
  
  const filter = { _id: request.params.id};
  const update = { suspended : false}

  await Driver.findOneAndUpdate(filter, update)

  response.status(204).end()

})


module.exports = driverRouter