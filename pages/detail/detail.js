import { createDetailChapters } from "../../components/detailChapter/detailChapter.js";
import { loadSpecificData } from "../../utils/local.js";
import { $ } from "/utils/common.js";

function bindData(data) {
  $(".author").textContent = `${data.authorId}`;
  $(".level").textContent = `난이도: ${data.level}`;
  $(".title").textContent = `${data.title}`;
  $(".tag").textContent = `${data.category}`;
  $(".description-text").textContent = `${data.description}`;
  $(
    ".main-curriculum-header-count"
  ).textContent = `챕터 ${data.curriculum.length}개`;
}

document.addEventListener("DOMContentLoaded", async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const lectureId = urlParams.get("id");

  const lectureData = loadSpecificData(lectureId);
  bindData(lectureData);

  console.log(lectureData);

  const chapterData = lectureData.curriculum.map((chapter, index) => {
    return {
      chapterTitle: `Chapter ${index + 1}. ${chapter.chapterTitle}`,
      lessonCount: `강의 ${chapter.lessonCount}개`,
      lessons: chapter.lessons,
    };
  });

  const chapters = await createDetailChapters(chapterData);

  chapters.forEach((chapter) => {
    $(".main-curriculum").appendChild(chapter);
  });
});
