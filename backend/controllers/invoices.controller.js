// backend/controllers/invoicesController.js

import * as InvoiceService from '../services/invoice.service.js';

/* ================================================  */
/* Advanced request  */
/* ================================================  */
export const getPendingInvoices = async (req, res, next) => {
    const invoices = await InvoiceService.findPendingInvoices();
    res.json(invoices);
};