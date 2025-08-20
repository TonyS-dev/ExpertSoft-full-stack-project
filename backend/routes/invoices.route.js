// backend/routes/invoices.routes.js

import express from 'express';
import * as invoicesController from '../controllers/invoices.controller.js';

const router = express.Router();

/* ================================================  */
/* Advanced route  */
/* ================================================  */
router.get('/pending', invoicesController.getPendingInvoices);

export default router;
