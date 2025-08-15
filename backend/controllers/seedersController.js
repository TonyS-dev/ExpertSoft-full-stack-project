// backend/controllers/seederController.js
import { insertToDatabase } from '../seeders/seeder.js';

/**
 * Orchestrates the execution of all seeder scripts.
 */
async function runAllSeeders() {
    console.log('🚀 Starting seeders via API call...');
    // The order is crucial due to foreign keys
    await insertToDatabase('payment_platforms', 'server/data/01_payment_platforms.csv');
    await insertToDatabase('transaction_types', 'server/data/02_transaction_types.csv');
    await insertToDatabase('customers', 'server/data/03_customers.csv');
    await insertToDatabase('invoices', 'server/data/04_invoices.csv');
    await insertToDatabase('transactions', 'server/data/05_transactions.csv');
    console.log('✅ All seeders executed successfully.');
}

export const runSeedersEndpoint = async (req, res, next) => {
    try {
        await runAllSeeders();
        res.status(200).json({ message: 'Database seeded successfully!' });
    } catch (error) {
        // Pass any error to the global handler
        next(error);
    }
};