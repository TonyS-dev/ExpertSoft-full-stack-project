// backend/routes/transactions.routes.js
import express from 'express';
import * as transactionsController from '../controllers/transactions.controller.js';

const router = express.Router();

/* ================================================  */
/* Advanced route  */
/* ================================================  */
router.get('/platform/:platformId', transactionsController.getTransactionsByPlatform);

export default router;