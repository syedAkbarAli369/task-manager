
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

const allowedOrigins = [
  "http://localhost:5173",
  "https://task-manager-cheel.vercel.app"
]

//Middleware to handle CORS
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false)
      }

      return callback(null, true)
    },
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


