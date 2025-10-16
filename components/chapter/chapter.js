import { createLesson, createLessons } from "../lesson/lesson.js";
import { componentLoader } from "/components/componentLoader.js";
import { $ } from "/utils/common.js";

const COMPONENT_PATH = "/components";
const COMPONENT_NAME = "chapter";

async function createChapter(data) {
  // 챕터 컴포넌트 생성
  const chapterElement = await componentLoader.loadComponent(
    COMPONENT_PATH,
    COMPONENT_NAME
  );

  componentLoader.bindMultipleData(chapterElement, {
    ".chapter-title-input": { property: "value", value: data.chapterTitle },
    ".chapter-title-length": data.chapterTitleLength,
    ".lesson-length": `${
      data.lessons.length === 0 ? 1 : data.lessons.length
    }개의 강의`,
    ".chapter-number": data.chapterNumber,
  });

  // 클릭이벤트 연결

  // 강의 추가 버튼 클릭 이벤트
  componentLoader.attachEvent(
    chapterElement,
    ".btn-add-lesson",
    "click",
    async () => {
      const lesson = await createLesson({
        lessonTitle: "",
      });
      chapterElement.querySelector(".lessons").appendChild(lesson);
    }
  );

  // 챕터 삭제
  componentLoader.attachEvent(
    chapterElement,
    ".btn-chapter-delete",
    "click",
    data.deleteChapter
  );

  componentLoader.attachEvent(
    chapterElement,
    ".chapter-title-input",
    "input",
    data.checkChapterLength
  );

  //  레슨 인풋 생성
  if (!data.lessons.length) {
    const lesson = await createLesson({
      lessonTitle: "",
    });
    chapterElement.querySelector(".lessons").appendChild(lesson);
  } else {
    const lessons = await createLessons(data.lessons);
    lessons.forEach((lesson) => {
      chapterElement.querySelector(".lessons").appendChild(lesson);
    });
  }

  return chapterElement;
}

async function createChapters(dataArray) {
  return Promise.all(dataArray.map((data) => createChapter(data)));
}

export { createChapter, createChapters };
