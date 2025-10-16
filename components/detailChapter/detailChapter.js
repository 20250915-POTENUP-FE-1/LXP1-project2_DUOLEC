import { createDetailLessons } from "../detailLesson/detailLesson.js";
import { componentLoader } from "/components/componentLoader.js";

const COMPONENT_PATH = "/components";
const COMPONENT_NAME = "detailChapter";

async function createDetailChapter(data) {
  const element = await componentLoader.loadComponent(
    COMPONENT_PATH,
    COMPONENT_NAME
  );

  componentLoader.bindMultipleData(element, {
    ".chapter-header-title": data.chapterTitle,
    ".chapter-lesson-count": data.lessonCount,
  });

  componentLoader.attachEvent(
    element,
    ".btn-expand-lesson",
    "click",
    data.onChapterClick
  );

  const lessonData = data.lessons.map((lesson, index) => {
    return { lessonTitle: `${index + 1}. ${lesson.lessonTitle}` };
  });

  const lessons = await createDetailLessons(lessonData);
  lessons.forEach((lesson) => {
    element.querySelector(".chapter-lessons").appendChild(lesson);
  });

  return element;
}

async function createDetailChapters(dataList) {
  return Promise.all(dataList.map((data) => createDetailChapter(data)));
}

export { createDetailChapter, createDetailChapters };
