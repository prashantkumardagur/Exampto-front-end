import runAPI from "./runAPI";


// Create a new exam.
export const initializeTestAPI = async (token) => {
  return await runAPI("/coordinator/initialize-test", token);
}

// Get the list of unpublished exams.
export const getUnpublishedExamsAPI = async (token) => {
  return await runAPI("/coordinator/get-unpublished-exams", token);
}

// Get the list of all types of published exams.
export const getAllExamsAPI = async (token) => {
  return await runAPI("/coordinator/get-all-exams", token);
}

// Get details of a exam.
export const getExamAPI = async (token, id) => {
  return await runAPI("/coordinator/get-exam", token, { id });
}

// Declare exam results.
export const declareResultsAPI = async (token, id) => {
  return await runAPI("/coordinator/declare-result", token, { id });
}

// Get analytics data
export const getAnalyticsAPI = async (token) => {
  return await runAPI("/coordinator/get-analytics", token);
}