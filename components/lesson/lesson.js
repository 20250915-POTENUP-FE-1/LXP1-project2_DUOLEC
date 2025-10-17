import { componentLoader } from "/components/componentLoader.js";

const COMPONENT_PATH = "/components";
const COMPONENT_NAME = "lesson";

async function createLesson(data) {
  //강의 제목 인풋 생성
  const lessonElement = await componentLoader.loadComponent(
    COMPONENT_PATH,
    COMPONENT_NAME
  );

  componentLoader.bindData(
    lessonElement,
    data.lessonTitle,
    ".lesson-title-input",
    "value"
  );

  componentLoader.attachEvent(
    lessonElement,
    ".btn-delete",
    "click",
    data.deleteLesson
  );
  return lessonElement;
}

async function createLessons(dataArray) {
  return Promise.all(
    dataArray.map((data) => {
      createLesson(data);
    })
  );
}

export { createLesson, createLessons };
