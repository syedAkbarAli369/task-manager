

import Task from '../models/task.js'

// @desc Create Task
// @route POST /api/tasks
// @access Private
const createTask = async (req, res) => {
  try {

    const {
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      todoCheckList
    } = req.body

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,

      assignedTo: JSON.parse(assignedTo),

      todoCheckList: JSON.parse(todoCheckList),

      attachments: req.file
        ? [`/uploads/${req.file.filename}`]
        : [],

      createdBy: req.user._id
    })

    res.status(201).json(task)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message: error.message
    })
  }
}

// @desc Get Tasks
// @route GET /api/tasks
// @access Private
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedTo', 'name profileImageUrl').sort({ createdAt: -1 })

    res.json(tasks)

  } catch (error) {
    res.status(500).json({ message: error.message })

  }
}

// @desc Update Task
// @route PUT /api/tasks/:id
// @access Private
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    // Check ownership
    const isOwner = task.createdBy.toString() === req.user._id.toString()

    const isAssignedMember = task.assignedTo.some(
      member => member.toString() === req.user._id.toString()
    )

    if (!isOwner && !isAssignedMember) {
      return res.status(403).json({
        message: 'Forbidden'
      })

    }

    task.title = req.body.title || task.title
    task.description = req.body.description || task.description
    task.priority = req.body.priority || task.priority
    task.status = req.body.status || task.status
    task.progress = req.body.progress !== undefined ? req.body.progress : task.progress
    task.dueDate = req.body.dueDate || task.dueDate
    task.assignedTo = req.body.assignedTo || task.assignedTo
    task.todoCheckList = req.body.todoCheckList || task.todoCheckList

    const updatedTask = await task.save()
    res.json(updatedTask)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


// @desc Delete Task
// @route DELETE /api/tasks/:id
// @access Private
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({ Message: "Task not found" })
    }

    if (task.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Forbidden, not task owner" })
    }

    await task.deleteOne()

    res.json({
      message: "Task deleted successfully",
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


// @desc Get Task By Id
// @route PUT /api/tasks/:id
// @access Private
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('assignedTo', 'name profileImageUrl')

    if (!task) {
      return res.status(404).json({
        message: 'Task not found'
      })
    }

    res.json(task)

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}


// @desc Get logged in member tasks
// @route GET /api/tasks/my
// @access Private
const getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      assignedTo: req.user._id
    }).populate('assignedTo', 'name profileImageUrl').sort({ createdAt: -1 })

    res.json(tasks)

  } catch (error) {
    res.status(500).json({
      message: error.message
    })

  }

}



export { createTask, getTasks, updateTask, deleteTask, getTaskById, getMyTasks }