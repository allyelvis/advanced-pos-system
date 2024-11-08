import mongoose from 'mongoose'

const vehicleSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  vin: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  status: { type: String, enum: ['available', 'sold', 'reserved'], default: 'available' },
  features: [String],
  mileage: { type: Number, required: true },
  color: { type: String, required: true },
  images: [String],
})

export default mongoose.model('Vehicle', vehicleSchema)
