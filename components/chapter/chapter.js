import { createLesson, createLessons } from "../lesson/lesson.js";
import { componentLoader } from "/components/componentLoader.js";

const COMPONENT_PATH = "/components";
const COMPONENT_NAME = "chapter";

async function createChapter(data) {
  // 챕터 컴포넌트 생성
  const chapterElement = await componentLoader.loadComponent(
    COMPONENT_PATH,
    COMPONENT_NAME
  );

  function deleteLesson(e) {
    const lessons = chapterElement.querySelectorAll(".lesson-title");
    if (lessons.length > 1) {
      e.target.closest(".lesson-title").remove();
    }
    setLessonNumber();
  }

  function setLessonNumber() {
    const lessonsNumber = chapterElement.querySelector(".lesson-length");
    const lessons = chapterElement.querySelectorAll(".lesson-title");

    lessonsNumber.innerText = `${lessons.length}개의 강의`;
  }

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
        deleteLesson: (e) => {
          deleteLesson(e);
        },
      });
      const lessons = chapterElement.querySelectorAll(".lesson-title");

      chapterElement.querySelector(".lessons").appendChild(lesson);
      setLessonNumber();
    }
  );

  // 챕터 삭제
  componentLoader.attachEvent(
    chapterElement,
    ".btn-chapter-delete",
    "click",
    data.deleteChapter
  );

  // 챕터 인풋 글자수 확인
  componentLoader.attachEvent(
    chapterElement,
    ".chapter-title-input",
    "input",
    (e) => {
      e.target.nextElementSibling.innerText = `${e.target.value.length} / 50`;
    }
  );

  //  레슨 인풋 생성
  if (!data.lessons.length) {
    const lesson = await createLesson({
      lessonTitle: "",
      deleteLesson: (e) => {
        deleteLesson(e);
      },
    });

    chapterElement.querySelector(".lessons").appendChild(lesson);
  } else {
    const lessonsData = data.lessons.map((lesson) => {
      return {
        lessonTitle: lesson.lessonTitle,
        deleteLesson: (e) => {
          deleteLesson(e);
        },
      };
    });
    const lessons = await createLessons(lessonsData);
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
