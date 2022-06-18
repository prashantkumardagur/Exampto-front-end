import runAPI from "./runAPI";

// Initialize the exam API
export const initializeExamAPI = async (token, id) => {
  return await runAPI("/exam/initialize-exam", token, { id });
}

// Marks an answer 
export const markAnswerAPI = async (token, resultId, index, answer) => {
  return await runAPI("/exam/mark-answer", token, { resultId, index, answer });
}

// Submit the exam
export const submitExamAPI = async (token, resultId) => {
  return await runAPI("/exam/submit-exam", token, { resultId });
}