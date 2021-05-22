const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.set('debug', true)
const rideSchema = mongoose.Schema({
    pickupPoint: {
        type: [Number],
        required: true
    },
    destinationPoint: {
        type: [Number],
        required: true
    },
    status: {
        type : String,
        required: true
    },
    passenger: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Passenger'
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver'
    },
})

rideSchema.plugin(uniqueValidator)

rideSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })


const Ride = mongoose.model('Ride', rideSchema)

module.exports = Ride