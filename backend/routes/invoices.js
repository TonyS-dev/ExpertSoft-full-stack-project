// backend/routes/invoices.routes.js

import express from 'express';
import * as invoicesController from '../controllers/invoicesController.js';

const router = express.Router();

/* ================================================  */
/* Advanced route  */
/* ================================================  */
router.get('/pending', invoicesController.getPendingInvoices);

export default router;
