// backend/controllers/customersController.js
// Responsibility: To handle HTTP requests, validate input, and orchestrate responses for the 'customers' entity.

import * as CustomerService from '../services/customer.service.js';

export const getAllCustomers = async (req, res, next) => {
    const customers = await CustomerService.findAllCustomers();
    res.json(customers);
};

export const getCustomerById = async (req, res, next) => {
    const { id } = req.params;
    const customer = await CustomerService.findCustomerById(id);
    if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(customer);
};

export const createCustomer = async (req, res, next) => {
    const { full_name, id_number, email } = req.body;
    if (!full_name || !id_number || !email) {
        return res.status(400).json({ message: 'Missing required fields: full_name, id_number, email' });
    }
    
    const newCustomerId = await CustomerService.addNewCustomer(req.body);
    res.status(201).json({ id: newCustomerId, message: 'Customer created successfully' });
};

export const updateCustomer = async (req, res, next) => {
    const { id } = req.params;
    const customerData = req.body;

    if (!customerData.full_name || !customerData.id_number || !customerData.email) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const affectedRows = await CustomerService.modifyCustomer(id, customerData);
    if (affectedRows === 0) {
        return res.status(404).json({ message: 'Customer not found' });
    }
    res.json({ message: 'Customer updated successfully' });
};

export const deleteCustomer = async (req, res, next) => {
    const { id } = req.params;
    const affectedRows = await CustomerService.removeCustomer(id);
    if (affectedRows === 0) {
        return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(204).send(); 
};

/* ================================================  */
/* Advanced request  */
/* ================================================  */

export const getTotalPaidPerCustomer = async (req, res, next) => {
    const report = await CustomerService.findTotalPaidPerCustomer();
    res.json(report);
};