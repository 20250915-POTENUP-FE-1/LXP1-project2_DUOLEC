import { createDetailChapters } from "../../components/detailChapter/detailChapter.js";
import { loadSpecificData } from "../../utils/local.js";
import { $ } from "/utils/common.js";

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
    };
  });

  const chapters = await createDetailChapters(chapterData);

  chapters.forEach((chapter) => {
    $(".main-curriculum").appendChild(chapter);
  });
});
