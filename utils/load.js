async function loadDummyData() {
  try {
    const response = await fetch("/data/lectures.json");
    if (!response.ok) {
      throw new Error("JSON 로드 중 오류 발생");
    }
    const dummyData = await response.json();

    return dummyData;
  } catch (error) {
    console.log(error);
  }
}

export { loadDummyData };
