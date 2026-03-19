import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Chat must belong to a user'],
    },
    title: {
      type: String,
      required: [true, 'Please provide a chat title'],
      trim: true,
      maxlength: [100, 'Chat title cannot exceed 100 characters'],
    },

  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Index for faster queries

const chatModel = mongoose.model('Chat', chatSchema);

export default chatModel;
