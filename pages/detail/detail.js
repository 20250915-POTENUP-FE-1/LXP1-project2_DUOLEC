import { createDetailChapters } from "../../components/detailChapter/detailChapter.js";
import { loadSpecificData } from "../../utils/local.js";
import { $ } from "/utils/common.js";

function toggleChapter(e) {
  const $clickedChapter = e.target.closest(".chapter");
  $clickedChapter.classList.toggle("visible");
  const $icon = $clickedChapter.querySelector("i");
  $icon.classList.toggle("rotate");
}

document.addEventListener("DOMContentLoaded", async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const lectureId = urlParams.get("id");

  const lectureData = loadSpecificData(parseInt(lectureId));

  console.log(lectureData.curriculum);

  const chapterData = lectureData.curriculum.map((chapter, index) => {
    return {
      chapterTitle: `Chapter ${index + 1}. ${chapter.chapterTitle}`,
      lessonCount: `강의 ${chapter.lessonCount}개`,
      lessons: chapter.lessons,
      onChapterClick: (e) => toggleChapter(e),
    };
  });

  const chapters = await createDetailChapters(chapterData);

  chapters.forEach((chapter) => {
    $(".main-curriculum").appendChild(chapter);
  });
});
