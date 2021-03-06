import runAPI, { hostUrl } from "./runAPI";


// Gets the exam data from the server
export const getExamAPI = async (token, id) => {
  return await runAPI("/editor/get-exam", token, { id });
}

// Publish the exam
export const publishExamAPI = async (token, id) => {
  return await runAPI("/editor/publish-exam", token, { id });
}

// Updates the exam data on the server
export const updateExamDetailsAPI = async (token, id, examData) => {
  return await runAPI("/editor/update-exam-details", token, { id, examData });
}

// Add a new question to the exam
export const addQuestionAPI = async (token, id, data) => {
  return await runAPI("/editor/add-question", token, { id, data });
}

// Update a question in the exam
export const updateQuestionAPI = async (token, id, index, content, answer) => {
  return await runAPI("/editor/update-question", token, { id, index, content, answer });
}

// Delete a question from the exam
export const deleteQuestionAPI = async (token, id, index) => {
  return await runAPI("/editor/delete-question", token, { id, index });
}

// Deletes the exam from the server
export const deleteExamAPI = async (token, id) => {
  return await runAPI("/editor/delete-exam", token, { id });
}



// Uploads a solution pdf to the server
export const uploadSolutionAPI = async (token, examId, file) => {
  const formData = new FormData();
  formData.append("examId", examId);
  formData.append("solutionFile", file);
  let response = await fetch(`${hostUrl}/editor/upload-solution/`, { 
    method: 'POST', 
    headers: { "Authorization": `Bearer ${token}` },
    body: formData,
  });
  return await response.json();
}

// Uploads a image to the server
export const uploadImageAPI = async (token, file) => {
  const formData = new FormData();
  formData.append("imageFile", file);
  let response = await fetch(`${hostUrl}/editor/upload-image/`, { 
    method: 'POST', 
    headers: { "Authorization": `Bearer ${token}` },
    body: formData,
  });
  return await response.json();
}


// Deletes a image from the server
export const deleteImageAPI = async (token, filename) => {
  return await runAPI("/editor/delete-image", token, { filename });
}