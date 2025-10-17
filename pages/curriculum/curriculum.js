import {
  createChapter,
  createChapters,
} from "../../components/chapter/chapter.js";
import { checkQueryString } from "../../utils/common.js";
import { modifyLocalData } from "../../utils/local.js";
import { $ } from "/utils/common.js";
import { addLocalData } from "/utils/local.js";
import { deleteTempData, loadTempData } from "/utils/session.js";
import { nanoid } from "https://cdn.skypack.dev/nanoid";

// 챕터 추가 기능
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
  setChapterLength();
}

// 챕터 삭제 기능
function deleteChapter(e) {
  if (document.querySelectorAll(".chapter-form").length > 1) {
    e.target.closest(".chapter-form").remove();
    setChapterNumber();
  }
  setChapterLength();
}

// 챕터 넘버링 기능
function setChapterNumber() {
  const chapters = document.querySelectorAll(".chapter-form");
  chapters.forEach((chapter, index) => {
    chapter.querySelector(".chapter-number").innerText = `Chapter ${
      index + 1
    }.`;
  });
}

// 챕터 목록 수 표시 기능
function setChapterLength() {
  const elementChapterLength = document.querySelector(".chapter-length");
  const chapterLength = document.querySelectorAll(".chapter-form").length;
  elementChapterLength.innerText = `${chapterLength}개의 챕터`;
}

// 챕터 버튼 클릭 시 챕터 컴포넌트 추가
document.querySelectorAll(".btn-add").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    addChapter();
  });
});

$(".header-logo").addEventListener("click", () => {
  deleteTempData();
});

// 버튼 submit 시 데이터 가져와서 로컬스토리지에 저장
$(".btn-submit").addEventListener("click", (e) => {
  e.preventDefault();
  const $chapterForms = document.querySelectorAll(".chapter-form");

  const $chapterTitleInputs = Array.from(
    document.querySelectorAll(".chapter-title-input")
  );
  const $lessonTitleInputs = Array.from(
    document.querySelectorAll(".lesson-title-input")
  );

  if (
    !$chapterTitleInputs.every((chapterTitleInput) =>
      chapterTitleInput.value.trim()
    ) ||
    !$lessonTitleInputs.every((lessonTitleInput) =>
      lessonTitleInput.value.trim()
    )
  ) {
    $(".warning").style.cssText = `opacity: 1`;
    setTimeout(() => {
      $(".warning").style.cssText = `opacity: 0`;
    }, 2000);
    return;
  }

  const tempData = loadTempData();
  const curriculum = [];

  $chapterForms.forEach((chapterForm) => {
    const lessons = [];
    const $lessons = chapterForm.querySelectorAll(".lesson-title");
    $lessons.forEach((lesson) => {
      const lessonId = nanoid();
      lessons.push({
        lessonId: lessonId,
        lessonTitle: lesson.querySelector(".lesson-title-input").value,
      });
    });

    curriculum.push({
      chapterTitle: chapterForm.querySelector(".chapter-title-input").value,
      lessonCount: chapterForm.querySelectorAll(".lesson-title").length,
      lessons: lessons,
    });
  });

  tempData.curriculum = curriculum;
  const totalLesson = document.querySelectorAll(".lesson-title").length;
  tempData.totalLessons = totalLesson;

  if (checkQueryString()) {
    console.log(tempData);
    modifyLocalData(tempData);
  } else {
    const date = new Date().toISOString();
    tempData.createdAt = date;
    addLocalData(tempData);
  }
  deleteTempData();
  window.location.href = "/";
});

// 뒤로가기 기능
$(".back-icon").addEventListener("click", (e) => {
  e.preventDefault();
  const sessionData = loadTempData();
  const $chapterForms = document.querySelectorAll(".chapter-form");
  sessionData.curriculum = [];

  $chapterForms.forEach((form) => {
    const lessons = Array.from(
      form.querySelectorAll(".lesson-title-input")
    ).map((lesson) => ({
      lessonId: nanoid(),
      lessonTitle: lesson.value,
    }));
    sessionData.curriculum.push({
      chapterTitle: `${form.querySelector(".chapter-title-input").value}`,
      lessonCount: form.querySelectorAll(".lesson-title").length,
      lessons: lessons,
    });
  });

  sessionStorage.setItem("tempData", JSON.stringify(sessionData));
  window.history.back();
});

// 강의 데이터 로드
document.addEventListener("DOMContentLoaded", async () => {
  if (checkQueryString()) {
    $(".btn-submit").textContent = "수정";
  }

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
