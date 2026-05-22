import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String
    },

    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium'
    },

    status: {
      type: String,
      enum: ['Acknowledged', 'Working', 'Completed'],
      default: 'Acknowledged'
    },

    dueDate: {
      type: Date
    },

    assignedTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],

    todoCheckList: [
      {
        text: String,
        completed: Boolean
      }
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    progress: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
)

const Task = mongoose.model('Task', taskSchema)

export default Task