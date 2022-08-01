export const hostUrl = process.env.REACT_APP_BACKEND_URL;


// Function to run APIs
const runAPI = async (url, token='', body={}) => {
  const apiUrl = new URL(`${hostUrl}${url}`);
  return await fetch(apiUrl, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(body),
  }).then(res => res.json());
}

// Search for exams
export const searchExams = async (token, role, search) => {
  return await runAPI(`/${role}/search-exams`, token, {search});
}

export default runAPI;
