import { componentLoader } from "/components/componentLoader.js";

const COMPONENT_PATH = "/components";
const COMPONENT_NAME = "detailLesson";

async function createDetailLesson(data) {
  const element = await componentLoader.loadComponent(
    COMPONENT_PATH,
    COMPONENT_NAME
  );

  componentLoader.bindData(element, data.lessonTitle, ".lesson-title");
  return element;
}

async function createDetailLessons(dataList) {
  return Promise.all(dataList.map((data) => createDetailLesson(data)));
}

export { createDetailLesson, createDetailLessons };
