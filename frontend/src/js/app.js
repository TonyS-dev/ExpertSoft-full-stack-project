// frontend/src/js/app.js

import * as api from './api.js';
import * as ui from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    // DOM Element References
    const dataContainer = document.getElementById('data-container');
    const createCustomerForm = document.getElementById('create-customer-form');
    const editCustomerForm = document.getElementById('edit-customer-form');

    // Bootstrap Modal Instances
    const createModal = new bootstrap.Modal(document.getElementById('createCustomerModal'));
    const editModal = new bootstrap.Modal(document.getElementById('editCustomerModal'));

    // Main function to load and display data
    async function loadAndDisplayCustomers() {
        try {
            const customers = await api.fetchAllCustomers();
            ui.renderCustomersTable(customers, dataContainer);
        } catch (error) {
            ui.renderError('Could not load customer data. Please try again later.', dataContainer);
        }
    }

    // --- Event Listeners ---

    // Handle Create Form Submission
    createCustomerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const customerData = {
            full_name: document.getElementById('create-full_name').value,
            email: document.getElementById('create-email').value,
            id_number: document.getElementById('create-id_number').value,
            phone: document.getElementById('create-phone').value,
            address: document.getElementById('create-address').value,
        };

        try {
            await api.createNewCustomer(customerData);
            createModal.hide();
            createCustomerForm.reset();
            loadAndDisplayCustomers();
        } catch (error) {
            alert(`Error creating customer: ${error.message}`);
        }
    });

    // Handle Edit Form Submission
    editCustomerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const customerId = document.getElementById('edit-customer-id').value;
        const customerData = {
            full_name: document.getElementById('edit-full_name').value,
            email: document.getElementById('edit-email').value,
            id_number: document.getElementById('edit-id_number').value,
            phone: document.getElementById('edit-phone').value,
            address: document.getElementById('edit-address').value,
        };

        try {
            await api.updateCustomerById(customerId, customerData);
            editModal.hide();
            loadAndDisplayCustomers();
        } catch (error) {
            alert(`Error updating customer: ${error.message}`);
        }
    });

    // Handle clicks on Edit and Delete buttons (Event Delegation)
    dataContainer.addEventListener('click', async (event) => {
        const target = event.target;
        const customerId = target.dataset.id;

        if (target.classList.contains('btn-edit')) {
            try {
                const customer = await api.fetchCustomerById(customerId);
                if (customer) {
                    ui.populateEditForm(customer, editCustomerForm);
                    editModal.show();
                } else {
                    alert('Could not find customer details.');
                }
            } catch (error) {
                alert(`Error fetching customer details: ${error.message}`);
            }
        }

        if (target.classList.contains('btn-delete')) {
            if (confirm(`Are you sure you want to delete customer #${customerId}?`)) {
                try {
                    await api.deleteCustomerById(customerId);
                    loadAndDisplayCustomers();
                } catch (error) {
                    alert(`Error deleting customer: ${error.message}`);
                }
            }
        }
    });

    // Initial data load
    loadAndDisplayCustomers();
});