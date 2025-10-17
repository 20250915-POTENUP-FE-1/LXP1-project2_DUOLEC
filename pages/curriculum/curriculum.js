import {
  createChapter,
  createChapters,
} from "../../components/chapter/chapter.js";
import { $ } from "/utils/common.js";
import { addLocalData } from "/utils/local.js";
import { deleteTempData, loadTempData } from "/utils/session.js";
import { nanoid } from "https://cdn.skypack.dev/nanoid";

async function addChapter() {
  const chapterForms = document.querySelectorAll(".chapter-form");
  const lastChapterForm = chapterForms[chapterForms.length - 1];
  const chapter = await createChapter({
    chapterTitle: "",
    chapterTitleLength: `0 / 50`,
    chapterNumber: `Chapter ${chapterForms.length + 1}.`,
    deleteChapter: (e) => {
      deleteChapter(e);
    },
    lessons: [],
  });
  lastChapterForm.insertAdjacentElement("afterend", chapter);
}

function deleteChapter(e) {
  if (document.querySelectorAll(".chapter-form").length > 1) {
    e.target.closest(".chapter-form").remove();
    setChapterNumber();
  }
}

function setChapterNumber() {
  const chapters = document.querySelectorAll(".chapter-form");
  chapters.forEach((chapter, index) => {
    chapter.querySelector(".chapter-number").innerText = `Chapter ${
      index + 1
    }.`;
  });
}

document.querySelectorAll(".btn-add").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    addChapter();
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

document.querySelectorAll(".chapter-title-input").forEach((input) => {
  input.addEventListener("input", (e) => {
    let titleLength = e.target.closest(".chapter-title-input").length;
    e.target.closest(".chapter-title-length").innerText = `${titleLength} / 50`;
  });
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
    };

    const chapter = await createChapter(chapterData);
    $(".chapter-info").prepend(chapter);
  }
});
