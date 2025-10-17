// 전체 데이터 로드
function loadStorageData() {
  return JSON.parse(localStorage.getItem("data"));
}

// 특정 강의 데이터만 로드
function loadSpecificData(lectureId) {
  const lectures = loadStorageData();
  return lectures.find((lecture) => lecture.lectureId === lectureId);
}

// 여러 강의 추가(우선 더미데이터에서만 호출)
function addLocalDatas(dataList) {
  dataList.forEach((data) => addLocalData(data));
}

// 강의 추가
function addLocalData(data) {
  const previous = loadStorageData();

  if (previous) {
    localStorage.setItem("data", JSON.stringify([...previous, data]));
  } else {
    localStorage.setItem("data", JSON.stringify([data]));
  }
}

// 강의 수정
function modifyLocalData(data) {
  const list = loadStorageData();
  const updated = list.map((lecture) => {
    if (lecture.lectureId === data.lectureId) {
      return data;
    }
    return lecture;
  });

  console.log(updated);

  localStorage.setItem("data", JSON.stringify(updated));
}

// 강의 삭제
function deleteLocalData(lectureId) {
  const previous = loadStorageData();
  const updated = previous.filter((lecture) => lecture.lectureId !== lectureId);
  localStorage.setItem("data", JSON.stringify(updated));
}

export {
  loadStorageData,
  loadSpecificData,
  addLocalDatas,
  addLocalData,
  modifyLocalData,
  deleteLocalData,
};
