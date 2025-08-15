-- =============================================
--  Database and Tables Creation Script
--  Project: ExpertSoft Fintech Management
-- =============================================

-- Step 1: Create the Database (if it does not exist)
-- It is recommended to use a descriptive name that meets the test requirements.
CREATE DATABASE IF NOT EXISTS experts_fintech_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

-- Step 2: Use the newly created Database
USE experts_fintech_db;

-- Step 3: Create the Normalized Tables

-- Catalog Table for Payment Platforms
-- Stores the names of the platforms to avoid redundancy.
CREATE TABLE IF NOT EXISTS payment_platforms (
    platform_id INT AUTO_INCREMENT PRIMARY KEY,
    platform_name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for Transaction Types
CREATE TABLE IF NOT EXISTS transaction_types (
    transaction_type_id INT AUTO_INCREMENT PRIMARY KEY,
    transaction_type VARCHAR(150) NOT NULL UNIQUE
);

-- Customers Table
-- Stores the unique information of each customer.
CREATE TABLE IF NOT EXISTS customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    id_number VARCHAR(50) NOT NULL UNIQUE,
    address TEXT NOT NULL,
    phone VARCHAR(50),
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Invoices Table
-- Stores the information of each invoice, linked to a customer.
CREATE TABLE IF NOT EXISTS invoices (
    invoice_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    invoice_number VARCHAR(100) NOT NULL UNIQUE COMMENT 'Invoice number visible to the client',
    billing_date VARCHAR(7) NOT NULL,
    total_amount DECIMAL(15, 2) NOT NULL,
    paid_amount DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign Key Definition
    CONSTRAINT fk_invoices_customers
        FOREIGN KEY (customer_id) 
        REFERENCES customers(customer_id)
        ON DELETE RESTRICT -- A customer cannot be deleted if they have invoices
        ON UPDATE CASCADE  -- If the customer's ID changes, it is updated here
);

-- Transactions Table
-- Stores each individual payment, linked to an invoice and a platform.
CREATE TABLE IF NOT EXISTS transactions (
    transaction_id VARCHAR(10) PRIMARY KEY,
    invoice_id INT NOT NULL,
    platform_id INT NOT NULL,
    transaction_type_id INT NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    status ENUM('Completed', 'Pending', 'Failed') NOT NULL,
    transaction_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign Keys Definition
    CONSTRAINT fk_transactions_invoices
        FOREIGN KEY (invoice_id) 
        REFERENCES invoices(invoice_id)
        ON DELETE RESTRICT,
        
    CONSTRAINT fk_transactions_platforms
        FOREIGN KEY (platform_id) 
        REFERENCES payment_platforms(platform_id)
        ON DELETE RESTRICT,
        
    CONSTRAINT fk_transactions_types
        FOREIGN KEY (transaction_type_id) 
        REFERENCES transaction_types(transaction_type_id)
        ON DELETE RESTRICT
);


-- End of script. The database is ready for bulk loading.