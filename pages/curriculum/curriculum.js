import { $ } from "/utils/common.js";

$(".chapter-title-input").addEventListener("input", () => {
  let title = $(".chapter-title-input").value;
  $(".chapter-title-length").innerText = `${title.length} / 50`;
});

function checkFormsLength() {
  $(".chapter-length").innerText = `${
    document.querySelectorAll(".chapter-form").length
  }개의 챕터`;
}

function checkLectureLength(e) {
  const clickedChapterForm = e.target.closest(".chapter-form");
  clickedChapterForm.querySelector(".lecture-length").innerText = `${
    e.target.closest(".lectures").children.length
  }개의 강의`;
}

function addLecture(e) {
  const clickedLecture = e.target.closest(".lectures");
  const lastLectureTitle =
    clickedLecture.children[clickedLecture.children.length - 2];
  fetch("/components/lecture.html")
    .then((res) => res.text())
    .then((resText) => {
      lastLectureTitle.insertAdjacentHTML("afterend", resText);
    });
  checkLectureLength(e);
}

function addChapter() {
  const chapterForms = document.querySelectorAll(".chapter-form");
  const lastChapterForm = chapterForms[chapterForms.length - 1];
  fetch("/components/chapter.html")
    .then((res) => res.text())
    .then((resText) => {
      lastChapterForm.insertAdjacentHTML("afterend", resText);
    })
    .then(() => {
      const afterChapterForms = document.querySelectorAll(".chapter-form");
      const afterLastChapterForm =
        afterChapterForms[afterChapterForms.length - 1];

      afterLastChapterForm
        .getElementsByClassName("btn-add-lecture")[0]
        .addEventListener("click", (e) => {
          addLecture(e);
          checkLectureLength(e);
        });

      checkFormsLength();
    });
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

$(".btn-submit").addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/index.html";
});
