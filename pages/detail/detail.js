import { createDetailChapters } from "../../components/detailChapter/detailChapter.js";
import { loadSpecificData } from "../../utils/local.js";
import { $, checkQueryString } from "/utils/common.js";

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
  const lectureId = checkQueryString();

  const lectureData = loadSpecificData(lectureId);
  bindData(lectureData);

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

  $('.btn-expand-description').addEventListener('click', () => {
    const descriptionHeight = $('.description-text').scrollHeight

    if($('.main-info-description').classList.contains('open')){
      $('.main-info-description').style.height = `200px`
      $('.main-info-description').classList.remove('open')
    }else{
      $('.main-info-description').style.height = `${descriptionHeight + 100}px`
      $('.main-info-description').classList.add('open')
    }

    $('.btn-expand-description i').classList.toggle('rotate')
  })
});
