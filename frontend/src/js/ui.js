// frontend/src/js/ui.js

export function renderCustomersTable(customers, containerElement) {
    if (!customers || customers.length === 0) {
        containerElement.innerHTML = '<p class="text-center">No customers found.</p>';
        return;
    }

    const sortedCustomers = customers.sort((a, b) => a.customer_id - b.customer_id);

    const tableRows = sortedCustomers.map(customer => `
        <tr>
            <td>${customer.customer_id}</td>
            <td>${customer.full_name}</td>
            <td>${customer.email}</td>
            <td>${customer.id_number}</td>
            <td>${customer.phone || 'N/A'}</td>
            <td>
                <button class="btn btn-warning btn-sm btn-edit" data-id="${customer.customer_id}">Edit</button>
                <button class="btn btn-danger btn-sm btn-delete" data-id="${customer.customer_id}">Delete</button>
            </td>
        </tr>
    `).join('');

    containerElement.innerHTML = `
        <table class="table table-hover align-middle">
            <thead class="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Identification</th>
                    <th>Phone</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${tableRows}
            </tbody>
        </table>
    `;
}

export function populateEditForm(customer, formElement) {
    formElement.querySelector('#edit-customer-id').value = customer.customer_id;
    formElement.querySelector('#edit-full_name').value = customer.full_name;
    formElement.querySelector('#edit-email').value = customer.email;
    formElement.querySelector('#edit-id_number').value = customer.id_number;
    formElement.querySelector('#edit-phone').value = customer.phone || '';
    formElement.querySelector('#edit-address').value = customer.address || '';
}

export function renderError(message, containerElement) {
    containerElement.innerHTML = `<div class="alert alert-danger">${message}</div>`;
}