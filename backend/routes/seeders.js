// backend/routes/seeders.js
import express from 'express';
import * as seedersController from '../controllers/seedersController.js';

const router = express.Router();

// Endpoint to run seeders
router.post('/run', seedersController.runSeedersEndpoint);

export default router;
