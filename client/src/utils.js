
export function parseJSON(response) {
  return response.json();
}

export default function callApi(url, success) {
  fetch(url)
    .then(parseJSON)
    .then((json) => {
      success(json);
  });
}
