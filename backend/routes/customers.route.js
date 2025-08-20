// backend/routes/customers.routes.js
// Responsibility: To define the URL routes for the 'customers' entity and map them to controller methods.

import express from 'express';
import * as customersController from '../controllers/customers.controller.js';

const router = express.Router();

/* ================================================  */
/* Advanced route  */
/* ================================================  */
router.get('/reports/total-paid', customersController.getTotalPaidPerCustomer);

// Route to get all customers and create a new customer
router.route('/')
    .get(customersController.getAllCustomers)
    .post(customersController.createCustomer);
    
// Route to get, update, and delete a specific customer by their ID
router.route('/:id')
    .get(customersController.getCustomerById)
    .put(customersController.updateCustomer)
    .delete(customersController.deleteCustomer);

export default router;
