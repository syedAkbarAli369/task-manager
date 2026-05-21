

import User from '../models/user.js'
import jwt from 'jsonwebtoken'

const protect = async (req, res, next) => {
  try {
    let token;

    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1]
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decoded.id).select('-password')

    next()

  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" })

  }
}


// Middleware for Admin only access 
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  }
  else {
    res.status(403).json({ message: "Forbidden, admin access only" })

  }
}

export { protect, adminOnly }