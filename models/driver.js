const mongoose = require('mongoose')

const driverSchema = mongoose.Schema({
    name: {
        type: String,
        
    },
    phoneNumber: String,
    suspended: {
        type: Boolean,
        default: 'false'
    },
    rides: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ride'
        }
    ]
})

driverSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const Driver = mongoose.model('Driver', driverSchema)

module.exports = Driver