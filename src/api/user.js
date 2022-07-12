import runAPI from "./runAPI";
import { hostUrl } from "./runAPI";

// Gets a specific exam details
export const getExamAPI = (token, id) => {
  return runAPI('/user/get-exam', token, { id });
}

// Gets complete exam details for a result
export const getResultAPI = (token, id) => {
  return runAPI('/user/get-result', token, { id });
}

// Enrolls a user in an exam
export const enrollAPI = async (token, id) => {
  return await runAPI("/user/enroll", token, { id });
}


// Downloads the solution pdf from the server
export const downloadSolutionAPI = async (token, examId) => {
  let response = await fetch(`${hostUrl}/user/download-solution/`, { 
    method: 'POST',
    headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ examId }),
  });
  if(response.status === 200) return await response.blob();
  else return await response.json();
}




// Gets all available practice exams
export const getPracticeExamsAPI = (token) => {
  return runAPI('/user/get-practice-exams', token);
}


// Gets all exams for a user
export const getExamsAPI = async (token) => {
  return await runAPI("/user/get-exams", token);
}

// Gets all results for a user
export const getResultsAPI = async (token) => {
  return await runAPI("/user/get-results", token);
}