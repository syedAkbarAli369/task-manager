
import Task from '../models/task.js'
import user from '../models/user.js'
import User from '../models/user.js'
import bcrypt from 'bcryptjs'

const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'member' }).select('-password')

    const userWithTaskCount = await Promise.all(
      users.map(async (user) => {
        const pendingTasks = await Task.countDocuments({ assignedTo: user._id, status: 'Acknowledged' })

        const inProgressTasks = await Task.countDocuments({ assignedTo: user._id, status: 'Working' })

        const completedTasks = await Task.countDocuments({ assignedTo: user._id, status: 'Completed' })

        return {
          ...user.toObject(),
          pendingTasks,
          inProgressTasks,
          completedTasks
        }
      })
    )

    res.json(userWithTaskCount)


  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

const getUserById = async (req, res) => {
  try {

    const user = await User.findById(req.params.id).select('-password')

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json(user)

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}


const deleteUser = async (req, res) => {
  try {

    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    await user.deleteOne()

    res.json({ message: "User deleted successfully" })

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

const getTeamMembers = async (req, res) => {
  try {
    const users = await User.find().select('-password')

    const team = await Promise.all(
      users.map(async (user) => {
        const acknowledged = await Task.countDocuments({
          assignedTo: user._id,
          status: 'Acknowledged'
        })

        const working = await Task.countDocuments({
          assignedTo: user._id,
          status: 'Working'
        })

        const completed = await Task.countDocuments({
          assignedTo: user._id,
          status: 'Completed'
        })

        return {
          ...user._doc,
          taskStats: {
            acknowledged,
            working,
            completed
          }
        }

      })
    )

    res.json(team)

  } catch (error) {
    res.status(500).json({
      message: error.message
    })

  }
}

export { getUsers, getUserById, deleteUser, getTeamMembers }