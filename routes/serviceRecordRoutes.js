import express from 'express'
import ServiceRecord from '../models/ServiceRecord.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const serviceRecords = await ServiceRecord.find().populate('vehicle')
    res.json(serviceRecords)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/', async (req, res) => {
  const serviceRecord = new ServiceRecord(req.body)
  try {
    const newServiceRecord = await serviceRecord.save()
    res.status(201).json(newServiceRecord)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const updatedServiceRecord = await ServiceRecord.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updatedServiceRecord)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await ServiceRecord.findByIdAndDelete(req.params.id)
    res.json({ message: 'Service record deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
