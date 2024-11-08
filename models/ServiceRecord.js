import mongoose from 'mongoose'

const serviceRecordSchema = new mongoose.Schema({
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  serviceDate: { type: Date, required: true },
  serviceType: { type: String, required: true },
  description: { type: String, required: true },
  cost: { type: Number, required: true },
  technician: { type: String, required: true },
  status: { type: String, enum: ['scheduled', 'in-progress', 'completed'], default: 'scheduled' },
  nextServiceDate: { type: Date },
})

export default mongoose.model('ServiceRecord', serviceRecordSchema)
