import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
      required: [true, 'Message must belong to a chat'],
    },
    content: {
      type: String,
      required: [true, 'Please provide message content'],
      trim: true,
      minlength: [1, 'Message cannot be empty'],
    },
    role: {
      type: String,
      enum: ['user', 'ai'],
      required: [true, 'Please specify the role (user or ai)'],
    },
    tokens: {
      type: Number,
      default: 0, // For tracking API usage
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Index for faster queries
messageSchema.index({ chat: 1, createdAt: 1 });

const messageModel   = mongoose.model('Message', messageSchema);

export default messageModel;
