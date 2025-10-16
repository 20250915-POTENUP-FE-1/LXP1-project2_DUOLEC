import {
  createChapter,
  createChapters,
} from "../../components/chapter/chapter.js";
import { createLesson } from "../../components/lesson/lesson.js";
import { $ } from "/utils/common.js";
import { addLocalData } from "/utils/local.js";
import { deleteTempData, loadTempData } from "/utils/session.js";
import { nanoid } from "https://cdn.skypack.dev/nanoid";

$(".chapter-title-input").addEventListener("input", () => {
  let title = $(".chapter-title-input").value;
  $(".chapter-title-length").innerText = `${title.length} / 50`;
});

function checkFormsLength() {
  $(".chapter-length").innerText = `${
    document.querySelectorAll(".chapter-form").length
  }개의 챕터`;
}

function checkLessonLength($lessons) {
  const $lessonList = $lessons.getElementsByClassName("lesson-title");
  $lessons
    .closest(".chapter-lessons")
    .querySelector(
      ".lesson-length"
    ).innerText = `${$lessonList.length}개의 강의`;
}

function addLesson(e) {
  const $lessons = e.target.closest(".lessons");
  // const lastLessonTitle = $lessons.children[$lessons.children.length - 2];
  // fetch("/components/lesson.html")
  //   .then((res) => res.text())
  //   .then((resText) => {
  //     const parser = new DOMParser();
  //     const doc = parser.parseFromString(resText, "text/html");
  //     const $lessonTitle = doc.body.firstElementChild;

  //     lastLessonTitle.insertAdjacentElement("afterend", $lessonTitle);
  //     return $lessonTitle;
  //   })
  //   .then(($lessonTitle) => {
  checkLessonLength($lessons);
  // $lessonTitle
  //   .getElementsByClassName("btn-delete")[0]
  //   .addEventListener("click", (e) => {
  //     deleteLesson(e);
  checkLessonLength($lessons);

  // });
  // });
}

async function addChapter() {
  const chapterForms = document.querySelectorAll(".chapter-form");
  const lastChapterForm = chapterForms[chapterForms.length - 1];
  // fetch("/components/chapter.html")
  //   .then((res) => res.text())
  //   .then((resText) => {
  //     const parser = new DOMParser();
  //     const doc = parser.parseFromString(resText, "text/html");
  //     doc.body.firstElementChild.querySelector(
  //       ".chapter-title-area h5"
  //     ).innerText = `Chapter ${chapterForms.length + 1}.`;
  //     const $chapterForm = doc.body.firstElementChild;

  //     lastChapterForm.insertAdjacentElement("afterend", $chapterForm);
  //     return $chapterForm;
  //   })
  //   .then(($chapterForm) => {
  //     const afterChapterForms = document.querySelectorAll(".chapter-form");
  //     const afterLastChapterForm =
  //       afterChapterForms[afterChapterForms.length - 1];

  //     afterLastChapterForm
  //       .getElementsByClassName("btn-add-lesson")[0]
  //       .addEventListener("click", (e) => {
  //         addLesson(e);
  //       });
  //     $chapterForm
  //       .querySelector(".btn-chapter-delete")
  //       .addEventListener("click", (e) => {
  //         checkFormsLength();
  //       });
  //     checkFormsLength();
  //   });
  const chapter = await createChapter({
    chapterTitle: "",
    lessons: [],
    chapterNumber: `Chapter ${
      document.querySelectorAll(".chapter-form").length + 1
    }.`,
  });
  lastChapterForm.insertAdjacentElement("afterend", chapter);
}

function deleteChapter(e) {
  if (document.querySelectorAll(".chapter-form").length > 1) {
    e.target.closest(".chapter-form").remove();
    console.log(e.target);
  }
}

document.querySelectorAll(".btn-add").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    addChapter();
  });
});

document.querySelectorAll(".btn-delete").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const $lessons = e.target.closest(".lessons");
    deleteLesson(e);
    checkLessonLength($lessons);
  });
});

$(".btn-submit").addEventListener("click", (e) => {
  e.preventDefault();
  const $chapterForms = document.querySelectorAll(".chapter-form");
  const tempData = modifyTempData();
  const curriculum = [];

  for (let i = 0; i < $chapterForms.length; i++) {
    const lesson = [];
    curriculum.push({
      chapterTitle: $chapterForms[i].querySelector(".chapter-title-input")
        .value,
      lessonCount: $chapterForms[i].querySelectorAll(".lesson-title").length,
      lessons: lesson,
    });
    for (
      let k = 0;
      k < $chapterForms[i].querySelectorAll(".lesson-title").length;
      k++
    ) {
      let lessonId = nanoid();
      lesson.push({
        lessonId: lessonId,
        lessonTitle: $chapterForms[i].querySelectorAll(".lesson-title-input")[k]
          .value,
      });
    }
  }
  tempData.curriculum = curriculum;

  addLocalData(tempData);
  deleteTempData();
  window.location.href = "/index.html";
});

$(".back-icon").addEventListener("click", (e) => {
  e.preventDefault();
  window.history.back();
});

// 강의 데이터 로드
document.addEventListener("DOMContentLoaded", async () => {
  const curriculum = loadTempData().curriculum;
  if (curriculum) {
    // 세션 스토리지에 데이터가 있을 때
    const chapterDatas = curriculum.map((chapter, index) => {
      return {
        chapterTitle: chapter.chapterTitle,
        chapterTitleLength: `${chapter.chapterTitle.length} / 50`,
        chapterNumber: `Chapter ${index + 1}.`,
        lessons: chapter.lessons,
        deleteChapter: (e) => {
          deleteChapter(e);
        },
        deleteLesson: (e) => {
          deleteLesson(e);
        },
      };
    });

    const chapters = await createChapters(chapterDatas);
    chapters.reverse();
    chapters.forEach((chapter) => {
      $(".chapter-info").prepend(chapter);
    });
  } else {
    // 세션 스토리지에 아무것도 없을 때
    const chapterData = {
      chapterTitle: "",
      chapterTitleLength: `0 / 50`,
      chapterNumber: `Chapter 1.`,
      lessons: [],
      deleteChapter: (e) => {
        deleteChapter(e);
      },
      deleteLesson: (e) => {
        deleteLesson(e);
      },
    };
    const chapter = await createChapter(chapterData);
    $(".chapter-info").prepend(chapter);
  }
});
