import AIService from '../services/AIService.js';
import FlowRepository from '../repositories/FlowRepository.js';

class FlowController {
  /**
   * Post prompt to AI and return response
   */
  async askAI(req, res) {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
      const result = await AIService.getAIResponse(prompt);
      res.json({ result });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch AI response', details: error.message });
    }
  }

  /**
   * Save a flow interaction to MongoDB
   */
  async saveFlow(req, res) {
    const { prompt, response } = req.body;
    if (!prompt || !response) {
      return res.status(400).json({ error: 'Prompt and response are required' });
    }

    try {
      const savedFlow = await FlowRepository.saveFlow({ prompt, response });
      res.status(201).json({ message: 'Flow saved successfully', id: savedFlow._id });
    } catch (error) {
      res.status(500).json({ error: 'Failed to save flow', details: error.message });
    }
  }

  /**
   * Fetch all saved flows
   */
  async getFlows(req, res) {
    try {
      const flows = await FlowRepository.getAllFlows();
      res.json(flows);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch saved flows', details: error.message });
    }
  }
}

export default new FlowController();
