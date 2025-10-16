function loadStorageData() {
  console.log(JSON.parse(localStorage.getItem("data")));
  return JSON.parse(localStorage.getItem("data"));
}

function loadSpecificData(id) {
  const data = window.localStorage.getItem("data");
}

function addLocalData(data) {
  const previous = JSON.parse(localStorage.getItem("data"));

  if (previous) {
    localStorage.setItem("data", JSON.stringify([...previous, data]));
  } else {
    localStorage.setItem("data", JSON.stringify([data]));
  }
}

function modifyLocalData() {}

function deleteLocalData() {}

export { addLocalData, loadStorageData };
