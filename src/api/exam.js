import runAPI from "./runAPI";

// Initialize the exam API
export const initializeExamAPI = async (token, id) => {
  return await runAPI("/exam/initialize-exam", token, { id });
}

// Marks an answer 
export const markAnswerAPI = async (token, resultId, index, answer) => {
  return await runAPI("/exam/mark-answer", token, { resultId, index, answer });
}

// Counts a disconnection
export const countDisconnectionAPI = async (token, resultId) => {
  return await runAPI("/exam/count-disconnection", token, { resultId });
}

// Submit the exam
export const submitExamAPI = async (token, resultId) => {
  return await runAPI("/exam/submit-exam", token, { resultId });
}