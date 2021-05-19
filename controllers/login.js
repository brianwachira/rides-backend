const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()

loginRouter.post('/', async (request, response) => {
  const body = request.body

  
  const passwordCorrect = (body.email === 'admin@admin.com' && body.password === 'admin123') ? true : false

  if (!( passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid email or password'
    })
  }

  const userForToken = {
    email: body.email
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, email : userForToken.email })
})

module.exports = loginRouter