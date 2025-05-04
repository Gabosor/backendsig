import mongoose from "mongoose"

const fuelSchema = mongoose.Schema({
  available: {
    type: Number,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
    default: 5000 // ajustable si deseas
  },
  type: {
    type: String,
    required: true
  }
})

const stationSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  fuels: {
    type: [fuelSchema],
    required: true
  },
  hour: {
    type: String
  },
  address: {
    type: String
  },
  contact: {
    phone: String,
    email: String
  },
  point: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  last_updated: {
    type: Date,
    default: Date.now
  }
})

const Stations = mongoose.model('Stations', stationSchema)
export default Stations
