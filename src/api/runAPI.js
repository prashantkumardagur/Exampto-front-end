const hostUrl = "http://localhost:8080";

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

export default runAPI;