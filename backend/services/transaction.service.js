// backend/services/transactions.service.js
import { pool } from '../models/db_connection.js';

/* ================================================  */
/* Advanced query  */
/* ================================================  */

/**
 * Finds all transactions for a specific payment platform.
 * @param {number} platformId - The ID of the payment platform.
 * @returns {Promise<Array>} A list of transactions with customer and invoice info.
 */
export const findTransactionsByPlatform = async (platformId) => {
    const [rows] = await pool.query(`
        SELECT
            t.transaction_id,
            t.amount,
            t.status,
            t.transaction_date,
            c.full_name AS customer_name,
            i.invoice_number
        FROM
            transactions t
        JOIN
            invoices i ON t.invoice_id = i.invoice_id
        JOIN
            customers c ON i.customer_id = c.customer_id
        WHERE
            t.platform_id = ?
        ORDER BY
            t.transaction_date DESC
    `, [platformId]);
    return rows;
};