import express from 'express'
import Vehicle from '../models/Vehicle.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const vehicles = await Vehicle.find()
    res.json(vehicles)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/', async (req, res) => {
  const vehicle = new Vehicle(req.body)
  try {
    const newVehicle = await vehicle.save()
    res.status(201).json(newVehicle)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updatedVehicle)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id)
    res.json({ message: 'Vehicle deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
