  const api_key = `AIzaSyAMrSOSgqowVINJ56ST5FD2ROgD1dNYZx4`;
  const url = `https://vision.googleapis.com/v1/images:annotate`;
  // Send API Request to Cloud Vision API
  const sendAPI = (base64string) => {
    let body = {
      requests: [
        {image: {content: base64string}, features: [{type: 'TEXT_DETECTION'}]}
      ]
    };
    let xhr = new XMLHttpRequest();
    xhr.open('POST', `${url}?key=${api_key}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    const p = new Promise((resolve, reject) => {
      xhr.onreadystatechange = () => {
        if (xhr.readyState != XMLHttpRequest.DONE) return;
        if (xhr.status >= 400) return reject({message: `Failed with ${xhr.status}:${xhr.statusText}`});
        resolve(JSON.parse(xhr.responseText));
      };
    })
    xhr.send(JSON.stringify(body));
    return p;
  }
  // Read input file
  const readFile = (file) => {
    let reader = new FileReader();
    const p = new Promise((resolve, reject) => {
      reader.onload = (ev) => {
        document.querySelector('img').setAttribute('src', ev.target.result);
        resolve(ev.target.result.replace(/^data:image\/(png|jpeg);base64,/, ''));
      };
    })
    reader.readAsDataURL(file);
    return p;
  };
  // Event handling
  document.querySelector('input').addEventListener('change', ev => {
    if (!ev.target.files || ev.target.files.length == 0) return;
    Promise.resolve(ev.target.files[0])
      .then(readFile)
      .then(sendAPI)
      .then(res => {
        console.log('SUCCESS!', res);
        document.querySelector('pre').innerHTML = JSON.stringify(res, null, 2);
      })
      .catch(err => {
        console.log('FAILED:(', err);
        document.querySelector('pre').innerHTML = JSON.stringify(err, null, 2);
      });
  });
