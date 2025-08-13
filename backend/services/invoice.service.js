// backend/services/invoice.service.js

import { pool } from '../models/db_connection.js';

/* ================================================  */
/* Advanced query  */
/* ================================================  */

/**
 * Finds all invoices with a balance greater than 0.
 * @returns {Promise<Array>} A list of pending invoices with customer information.
 */
export const findPendingInvoices = async () => {
    const [rows] = await pool.query(`
        SELECT
            i.invoice_id,
            i.invoice_number,
            i.billing_date,
            (i.total_amount - i.paid_amount) AS balance,
            c.full_name AS customer_name,
            c.email AS customer_email
        FROM
            invoices i
        JOIN
            customers c ON i.customer_id = c.customer_id
        WHERE
            (i.total_amount - i.paid_amount) > 0
        ORDER BY
            i.billing_date ASC
    `);
    return rows;
};