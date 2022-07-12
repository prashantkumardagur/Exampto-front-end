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