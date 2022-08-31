import runAPI from './runAPI';


// Fetches the list of all coordinators
export const getCoordinatorsAPI = async (token) => {
  return await runAPI("/admin/get-coordinators", token);
}

// Fetches the list of all users
export const getUsersAPI = async (token) => {
  return await runAPI("/admin/get-users", token);
}

// Creates a new coordinator
export const createCoordinatorAPI = async (token, data) => {
  return await runAPI("/admin/create-new-coordinator", token, data);
}

// Toggle ban status of a person
export const toggleBanAPI = async (token, id) => {
  return await runAPI("/admin/toggle-ban", token, {id});
}



// Get messages
export const getMessagesAPI = async (token) => {
  return await runAPI("/admin/get-messages", token);
}

// Toggle resolve of a message
export const toggleResolveAPI = async (token, id) => {
  return await runAPI("/admin/toggle-message-resolve", token, {id});
}

// Delete a message
export const deleteMessageAPI = async (token, id) => {
  return await runAPI("/admin/delete-message", token, {id});
}



// Get all payments
export const getPaymentsAPI = async (token) => {
  return await runAPI("/admin/get-payments", token);
}

// Get pending payments
export const getPendingPaymentsAPI = async (token) => {
  return await runAPI("/admin/get-pending-payments", token);
}

// Reject payment request
export const rejectPaymentAPI = async (token, id) => {
  return await runAPI("/admin/reject-payment", token, {id});
}

// Approve payment request
export const approvePaymentAPI = async (token, data) => {
  return await runAPI("/admin/approve-payment", token, data);
}
