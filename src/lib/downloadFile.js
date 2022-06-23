export function downloadFile(data, filename) {

  const blob = new Blob([data], {type: 'application/pdf'});
  const blobURL = window.URL.createObjectURL(blob);


  const tempLink = document.createElement('a');
  tempLink.style.display = 'none';
  tempLink.href = blobURL;
  tempLink.setAttribute('download', filename);

  if (typeof tempLink.download === 'undefined') {
    tempLink.setAttribute('target', '_blank');
  }


  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);


  setTimeout(() => {
    // For Firefox it is necessary to delay revoking the ObjectURL
    window.URL.revokeObjectURL(blobURL);
  }, 100);
}