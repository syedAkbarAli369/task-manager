
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import path from 'path'
import dns from 'dns'
import connectDB from './config/db.js'

import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import reportRoutes from './routes/reportRoutes.js'

dns.setServers(["1.1.1.1", "8.8.8.8"])

dotenv.config();

const app = express()

//Middleware to handle CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
)

// Middleware 
app.use(express.json());

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/reports', reportRoutes)

// Start the server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
})


