import runAPI from "./runAPI";

// Gets a specific exam details
export const getExamAPI = (token, id) => {
  return runAPI('/user/get-exam', token, { id });
}

// Gets all exams for a user
export const getExamsAPI = async (token) => {
  return await runAPI("/user/get-exams", token);
}

// Enrolls a user in an exam
export const enrollAPI = async (token, id) => {
  return await runAPI("/user/enroll", token, { id });
}