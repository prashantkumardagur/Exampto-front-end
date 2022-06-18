import runAPI from './runAPI';


// Gets a new token from the server
export const refreshTokenAPI = async (token) => {
  return await runAPI('/auth/refreshtoken', token);
}

// Logins a user
export const loginAPI = async (loginData) => {
  return await runAPI('/auth/login', '', loginData);
}

export const signUpAPI = async (signupData) => {
  return await runAPI('/auth/register/user', '', signupData);
}