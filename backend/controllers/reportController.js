

import Task from '../models/task.js'
import User from '../models/user.js'

// @desc Get Dashboard Report
// @route GET /api/reports/dashboard
// @access Private/Admin

const getDashboardReport = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments()

    const totalTasks = await Task.countDocuments()

    const acknowledgedTasks = await Task.countDocuments({
      status: 'Acknowledged'
    })

    const workingTasks = await Task.countDocuments({
      status: 'Working'
    })

    const completedTasks = await Task.countDocuments({
      status: 'Completed'
    })

    res.json({
      totalUsers,
      totalTasks,
      acknowledgedTasks,
      workingTasks,
      completedTasks
    })

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })

  }
}

export { getDashboardReport }