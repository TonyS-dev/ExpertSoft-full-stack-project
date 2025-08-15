// backend/server/index.js
import cors from "cors"
import express from "express"
import morgan from "morgan";
import customersRoutes from "./../routes/customers.js";
import invoicesRoutes from "./../routes/invoices.js";
import transactionsRoutes from "./../routes/transactions.js";
import seedersRoutes from "./../routes/seeders.js";

import { globalErrorHandler } from "./../middleware/globalErrorHandler.js";

// Initial server configuration
const app = express();
app.set('port', process.env.PORT);

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use('/customers', customersRoutes);
app.use('/invoices', invoicesRoutes);
app.use('/transactions', transactionsRoutes);
app.use('/seeder', seedersRoutes);

// Global Error Handler
app.use(globalErrorHandler);

// Initialize server
app.listen(app.get('port'), () => {
    console.log(`Servidor escuchando en el puerto ${app.get('port')}`);
});