import mongoose from 'mongoose'

const serviceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['restaurante', 'baño', 'tienda', 'cajero', 'hotel', 'hostal'],
    required: true
  },
  address: {
    type: String,
    trim: true
  },
  image_url: {
    type: String,
    default: ''
  },
  contact: {
    phone: String,
    email: String,
  },
  point: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [lng, lat]
      required: true
    }
  },
  last_updated: {
    type: Date,
    default: Date.now
  }
})

const Services = mongoose.model('Services', serviceSchema)
export default Services
