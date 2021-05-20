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

module.exports = driverRouter