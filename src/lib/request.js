const noOperation = () => {};
const NO_PARAMS = {};
const NO_HEADERS = {};
const OK_200 = [200, 201];

function request({
  method = 'GET',
  url,
  params = NO_PARAMS,
  responseType = 'json',
  requestType = 'json',
  okResponse = OK_200,
  headers = NO_HEADERS,
  body,
  checkStatusInResponse = false,
  onSuccess = noOperation,
  onError = noOperation,
  formElement,
}) {
  const req = new XMLHttpRequest();

  const urlParams = new URLSearchParams(params);

  const queryString = urlParams.toString();

  req.open(method, url + (queryString ? `?${queryString}` : ''));
  Object.keys(headers).forEach((key) => {
    req.setRequestHeader(key, headers[key]);
  });
  req.responseType = responseType;
  req.onload = function (event) {
    const target = event.target;
    if (!okResponse.includes(target.status)) {
      onError(target.statusText);
      return;
    }

    if (checkStatusInResponse && target.response.status !== 'ok') {
      onError(target.statusText);
      return;
    }
    onSuccess(target.response);
  };

  let dataBody = body;

  req.onerror = function () {
    onError();
  };

  if (requestType === 'urlencoded') {
    req.setRequestHeader('content-type', 'application/x-www-form-urlencoded');

    const bodyParams = new URLSearchParams(body);

    dataBody = bodyParams.toString();
  }
  if (requestType === 'json') {
    req.setRequestHeader('content-type', 'application/json');

    dataBody = JSON.stringify(body);
}

  if (requestType === 'form-data') {
    req.setRequestHeader('content-type', 'multipart/form-data');
    dataBody = new FormData(dataBody);
  }

  req.send(dataBody);
}
