import FlowLog from '../models/FlowLog.js';

class FlowRepository {
  async saveFlow(flowData) {
    const newLog = new FlowLog(flowData);
    return await newLog.save();
  }

  async getAllFlows() {
    return await FlowLog.find().sort({ createdAt: -1 });
  }

  async getFlowById(id) {
    return await FlowLog.findById(id);
  }
}

export default new FlowRepository();
