const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const passengerSchema = mongoose.Schema({
    name: {
        type: String,
    },

    phoneNumber: {
        type:String,
        unique: true
    },
    rides: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ride'
        }
    ]
})

passengerSchema.plugin(uniqueValidator)

passengerSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const Passenger = mongoose.model('Passenger', passengerSchema)

module.exports = Passenger