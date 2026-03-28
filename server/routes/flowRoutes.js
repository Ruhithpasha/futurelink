import express from 'express';
import FlowController from '../controllers/FlowController.js';

const router = express.Router();

// AI request endpoint
router.post('/ask-ai', FlowController.askAI);

// Persistence logic
router.post('/save-flow', FlowController.saveFlow);
router.get('/saved-flows', FlowController.getFlows);

export default router;
