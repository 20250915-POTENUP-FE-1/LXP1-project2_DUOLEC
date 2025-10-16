import { $ } from "/utils/common.js";
import { addLocalData } from "/utils/local.js";
import { deleteTempData, modifyTempData } from "/utils/session.js";
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

function checkLectureLength($lectures) {
  const $lectureList = $lectures.getElementsByClassName("lecture-title");
  $lectures
    .closest(".chapter-lectures")
    .querySelector(
      ".lecture-length"
    ).innerText = `${$lectureList.length}개의 강의`;
}

function addLecture(e) {
  const $lectures = e.target.closest(".lectures");
  const lastLectureTitle = $lectures.children[$lectures.children.length - 2];
  fetch("/components/lecture.html")
    .then((res) => res.text())
    .then((resText) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(resText, "text/html");
      const $lectureTitle = doc.body.firstElementChild;

      lastLectureTitle.insertAdjacentElement("afterend", $lectureTitle);
      return $lectureTitle;
    })
    .then(($lectureTitle) => {
      checkLectureLength($lectures);
      $lectureTitle
        .getElementsByClassName("btn-delete")[0]
        .addEventListener("click", (e) => {
          deleteLecture(e);
          checkLectureLength($lectures);
        });
    });
}

function addChapter() {
  const chapterForms = document.querySelectorAll(".chapter-form");
  const lastChapterForm = chapterForms[chapterForms.length - 1];
  fetch("/components/chapter.html")
    .then((res) => res.text())
    .then((resText) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(resText, "text/html");
      doc.body.firstElementChild.querySelector(
        ".chapter-title-area h5"
      ).innerText = `Chapter ${chapterForms.length + 1}.`;
      const $chapterForm = doc.body.firstElementChild;

      lastChapterForm.insertAdjacentElement("afterend", $chapterForm);
      return $chapterForm;
    })
    .then(($chapterForm) => {
      const afterChapterForms = document.querySelectorAll(".chapter-form");
      const afterLastChapterForm =
        afterChapterForms[afterChapterForms.length - 1];

      afterLastChapterForm
        .getElementsByClassName("btn-add-lecture")[0]
        .addEventListener("click", (e) => {
          addLecture(e);
        });
      $chapterForm
        .querySelector(".btn-chapter-delete")
        .addEventListener("click", (e) => {
          deleteChapter(e);
          checkFormsLength();
        });
      checkFormsLength();
    });
}

function deleteLecture(e) {
  if (
    e.target.closest(".chapter-form").getElementsByClassName("lecture-title")
      .length > 1
  ) {
    e.target.closest(".lecture-title").remove();
  }
}

function deleteChapter(e) {
  if (document.querySelectorAll(".chapter-form").length > 1) {
    e.target.closest(".chapter-form").remove();
  }
}

document.querySelectorAll(".btn-add-lecture").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    addLecture(e);
  });
});

document.querySelectorAll(".btn-add").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    addChapter();
  });
});

document.querySelectorAll(".btn-delete").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const $lectures = e.target.closest(".lectures");
    deleteLecture(e);
    checkLectureLength($lectures);
  });
});

document.querySelector(".btn-chapter-delete").addEventListener("click", (e) => {
  deleteChapter(e);
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
      lessonCount: $chapterForms[i].querySelectorAll(".lecture-title").length,
      lessons: lesson,
    });
    for (
      let k = 0;
      k < $chapterForms[i].querySelectorAll(".lecture-title").length;
      k++
    ) {
      let lessonId = nanoid();
      lesson.push({
        lessonId: lessonId,
        lessonTitle: $chapterForms[i].querySelectorAll(".lecture-title-input")[
          k
        ].value,
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
