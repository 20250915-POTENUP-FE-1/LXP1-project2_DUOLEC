const $ = (selector) => document.querySelector(selector);

function checkQueryString() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const lectureId = urlParams.get("id");
  return lectureId;
}

export { $, checkQueryString };
