// backend/controllers/transactionsController.js
import * as TransactionService from '../services/transaction.service.js';

/* ================================================  */
/* Advanced request  */
/* ================================================  */
export const getTransactionsByPlatform = async (req, res, next) => {
    const { platformId } = req.params;
    const transactions = await TransactionService.findTransactionsByPlatform(platformId);
    res.json(transactions);
};