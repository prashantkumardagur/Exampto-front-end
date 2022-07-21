import runAPI from './runAPI';


// Gets a new token from the server
export const refreshTokenAPI = async (token) => {
  return await runAPI('/auth/refreshtoken', token);
}

// Logins a user
export const loginAPI = async (loginData) => {
  return await runAPI('/auth/login', '', loginData);
}

// Registers a user
export const signUpAPI = async (signupData) => {
  return await runAPI('/auth/register/user', '', signupData);
}



// Changes a user's password
export const changePasswordAPI = async (token, data) => {
  return await runAPI('/auth/change-password', token, data);
}

// Updates a user's profile
export const updateProfileAPI = async (token, data) => {
  return await runAPI('/auth/update-profile', token, data);
}
