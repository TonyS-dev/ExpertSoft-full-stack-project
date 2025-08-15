// frontend/src/js/api.js

const API_BASE_URL = 'http://localhost:3000';

async function apiRequest(path, method = 'GET', body = null) {
    const url = `${API_BASE_URL}${path}`;
    const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
    };
    if (body) options.body = JSON.stringify(body);

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: `HTTP Error: ${response.statusText}` }));
            throw new Error(errorData.message);
        }
        if (response.status === 204) return { success: true };
        return response.json();
    } catch (error) {
        console.error(`API request failed: ${method} ${path}`, error);
        throw error;
    }
}

// --- Customer-specific API functions ---
export const fetchAllCustomers = () => apiRequest('/customers');
export const fetchCustomerById = (customerId) => apiRequest(`/customers/${customerId}`);
export const createNewCustomer = (customerData) => apiRequest('/customers', 'POST', customerData);
export const updateCustomerById = (customerId, customerData) => apiRequest(`/customers/${customerId}`, 'PUT', customerData);
export const deleteCustomerById = (customerId) => apiRequest(`/customers/${customerId}`, 'DELETE');

// --- Seeder API function ---
export const runSeed = () => apiRequest('/seeder/run', 'POST');