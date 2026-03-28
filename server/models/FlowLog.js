import mongoose from 'mongoose';

const flowLogSchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const FlowLog = mongoose.model('FlowLog', flowLogSchema);

export default FlowLog;
