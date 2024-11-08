import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import userRoutes from './routes/userRoutes.js'
import accountingRoutes from './routes/accountingRoutes.js'
import vehicleRoutes from './routes/vehicleRoutes.js'
import customerRoutes from './routes/customerRoutes.js'
import serviceRecordRoutes from './routes/serviceRecordRoutes.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error))

app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/users', userRoutes)
app.use('/api/accounting', accountingRoutes)
app.use('/api/vehicles', vehicleRoutes)
app.use('/api/customers', customerRoutes)
app.use('/api/service-records', serviceRecordRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
