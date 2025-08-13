// backend/services/customer.service.js
// Responsibility: To interact directly with the database for the 'customers' entity.

import { pool } from '../models/db_connection.js';

/**
 * Finds and returns all customers from the database.
 * @returns {Promise<Array>} An array of customer objects.
 */
export const findAllCustomers = async () => {
    const [rows] = await pool.query('SELECT * FROM customers ORDER BY full_name ASC');
    return rows;
};

/**
 * Finds a customer by their ID.
 * @param {number} id - The ID of the customer to find.
 * @returns {Promise<Object|undefined>} The customer object if found, otherwise undefined.
 */
export const findCustomerById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM customers WHERE customer_id = ?', [id]);
    return rows[0];
};

/**
 * Adds a new customer to the database.
 * @param {Object} customerData - The data for the customer to be created.
 * @returns {Promise<number>} The ID of the newly inserted customer.
 */
export const addNewCustomer = async (customerData) => {
    const { full_name, id_number, address, phone, email } = customerData;
    const [result] = await pool.query(
        'INSERT INTO customers (full_name, id_number, address, phone, email) VALUES (?, ?, ?, ?, ?)',
        [full_name, id_number, address, phone, email]
    );
    return result.insertId;
};

/**
 * Modifies an existing customer in the database.
 * @param {number} id - The ID of the customer to update.
 * @param {Object} customerData - The new data for the customer.
 * @returns {Promise<number>} The number of affected rows (0 if not found, 1 if updated).
 */
export const modifyCustomer = async (id, customerData) => {
    const { full_name, id_number, address, phone, email } = customerData;
    const [result] = await pool.query(
        'UPDATE customers SET full_name = ?, id_number = ?, address = ?, phone = ?, email = ? WHERE customer_id = ?',
        [full_name, id_number, address, phone, email, id]
    );
    return result.affectedRows;
};

/**
 * Removes a customer from the database by their ID.
 * @param {number} id - The ID of the customer to remove.
 * @returns {Promise<number>} The number of affected rows (0 if not found, 1 if removed).
 */
export const removeCustomer = async (id) => {
    const [result] = await pool.query('DELETE FROM customers WHERE customer_id = ?', [id]);
    return result.affectedRows;
};


/* ================================================  */
/* Advanced query  */
/* ================================================  */

/**
 * Calculates the total amount paid by each customer across all their invoices.
 * @returns {Promise<Array>} A list of customers with their total paid amount.
 */
export const findTotalPaidPerCustomer = async () => {
    const [rows] = await pool.query(`
        SELECT
            c.customer_id,
            c.full_name,
            c.email,
            SUM(t.amount) AS total_paid
        FROM
            customers c
        JOIN
            invoices i ON c.customer_id = i.customer_id
        JOIN
            transactions t ON i.invoice_id = t.invoice_id
        WHERE
            t.status = 'Completed' -- Only count completed transactions
        GROUP BY
            c.customer_id, c.full_name, c.email
        ORDER BY
            total_paid DESC;
    `);
    return rows;
};