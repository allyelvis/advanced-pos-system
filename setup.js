import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from './models/User.js'
import Product from './models/Product.js'
import Vehicle from './models/Vehicle.js'

dotenv.config()

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error))

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({})
    await Product.deleteMany({})
    await Vehicle.deleteMany({})

    // Create admin user
    await User.create({
      username: 'admin',
      password: 'adminpassword',
      role: 'admin',
      email: 'admin@example.com',
      firstName: 'Admin',
      lastName: 'User'
    })

    // Create sample products
    await Product.insertMany([
      { name: 'Oil Filter', price: 15.99, stock: 100, category: 'Car Parts', sku: 'OF001' },
      { name: 'Brake Pads', price: 45.99, stock: 50, category: 'Car Parts', sku: 'BP001' },
      { name: 'Windshield Wipers', price: 22.99, stock: 75, category: 'Car Parts', sku: 'WW001' }
    ])

    // Create sample vehicles
    await Vehicle.insertMany([
      { make: 'Toyota', model: 'Camry', year: 2022, vin: '1HGBH41JXMN109186', price: 25000, mileage: 1000, color: 'Silver' },
      { make: 'Honda', model: 'Civic', year: 2021, vin: '2HGFC2F5MH523641', price: 22000, mileage: 5000, color: 'Blue' },
      { make: 'Ford', model: 'F-150', year: 2023, vin: '1FTEW1E53JFC92748', price: 35000, mileage: 500, color: 'Red' }
    ])

    console.log('Sample data inserted successfully')
  } catch (error) {
    console.error('Error seeding database:', error)
  } finally {
    mongoose.connection.close()
  }
}

seedDatabase()
