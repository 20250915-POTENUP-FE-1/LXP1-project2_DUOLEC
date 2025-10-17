import { nanoid } from "https://cdn.skypack.dev/nanoid";

function addTempData(data) {
  data.lectureId = nanoid();
  data.authorId = "seyun0714";
  data.thumbnail = "assets/thumbnails/thumbnail.png";
  data.enrollmentCount = 0;
  data.totalLessons = 0;
  console.log(data);
  sessionStorage.setItem("tempData", JSON.stringify(data));
}

function modifyTempData(data) {
  const previous = loadTempData();
  const modifed = { ...previous, ...data };
  sessionStorage.setItem("tempData", JSON.stringify(modifed));
}

function loadTempData() {
  const data = sessionStorage.getItem("tempData");
  return JSON.parse(data);
}

function deleteTempData() {
  sessionStorage.removeItem("tempData");
}

export { addTempData, loadTempData, deleteTempData, modifyTempData };
