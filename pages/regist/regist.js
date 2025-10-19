import { loadSpecificData } from "../../utils/local.js";
import { $, checkQueryString } from "/utils/common.js";
import {
  addTempData,
  loadTempData,
  modifyTempData,
  deleteTempData,
} from "/utils/session.js";
import { nanoid } from "https://cdn.skypack.dev/nanoid";

function checkLocalData(lectureId) {
  const localData = loadSpecificData(lectureId);
  const $title = $(".title-input");
  const $levels = $(".level-label p");
  const $category = $(".category-label p");
  const $description = $(".description");
  const $thumbnail = $(".regist-thumbnail-area label");
  $title.value = localData.title;
  $levels.innerText = localData.level;
  $category.innerText = localData.category;
  $description.value = localData.description;
  $thumbnail.style.backgroundImage = `url(${
    localData.thumbnail.startsWith("assets/thumbnails")
      ? `/${localData.thumbnail}`
      : localData.thumbnail
  })`;

  $(
    ".category-label p"
  ).style.cssText = `font-size: 18px; font-weight: 500; color: #333;`;
  $(
    ".level-label p"
  ).style.cssText = `font-size: 18px; font-weight: 500; color: #333;`;

  $(".regist-thumbnail-area label")
    .querySelectorAll("div, p, span")
    .forEach((el) => {
      el.style.display = "none";
    });
}

function checkSessionData(sessionData) {
  const $title = $(".title-input");
  const $levels = $(".level-label p");
  const $category = $(".category-label p");
  const $description = $(".description");
  const $thumbnail = $(".regist-thumbnail-area label");

  $title.value = sessionData.title;
  $levels.innerText = sessionData.level;
  $category.innerText = sessionData.category;
  $description.value = sessionData.description;
  $thumbnail.style.backgroundImage = `url(${
    sessionData.thumbnail.startsWith("assets/thumbnails")
      ? `/${sessionData.thumbnail}`
      : sessionData.thumbnail
  })`;

  $(
    ".category-label p"
  ).style.cssText = `font-size: 18px; font-weight: 500; color: #333;`;
  $(
    ".level-label p"
  ).style.cssText = `font-size: 18px; font-weight: 500; color: #333;`;

  $(".regist-thumbnail-area label")
    .querySelectorAll("div, p, span")
    .forEach((el) => {
      el.style.display = "none";
    });
}

// 글자 카운팅
$(".title-input").addEventListener("input", (e) => {
  let content = $(".title-input").value;
  $(".letter-length").innerText = `${content.length} / 50`;
});

// 난이도 아코디언 토글
$(".level-label").addEventListener("click", (e) => {
  e.preventDefault();
  $(".level-select-area ul").classList.toggle("open-level");
  $(".level-select-area svg").classList.toggle("rotate");
});

// 난이도 선택
document.querySelectorAll(".level-content").forEach((level) => {
  level.addEventListener("click", (e) => {
    let selectOption = e.target.innerText;
    $(".level-label p").innerText = selectOption;
    $(
      ".level-label p"
    ).style.cssText = `font-size: 18px; font-weight: 500; color: #333;`;
    $(".level-select-area ul").classList.remove("open-level");
    $(".level-select-area svg").classList.remove("rotate");
  });
});

// 썸네일 업로드
$(".thumbnail-image").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = () => {
    $(
      ".regist-thumbnail-area label"
    ).style.cssText = `background-image: url(${reader.result}); border: 1px solid #58a7fc7e`;

    $(".regist-thumbnail-area label")
      .querySelectorAll("div, p, span")
      .forEach((el) => {
        el.style.display = "none";
      });
  };
});

// 카테고리 아코디언 토글
$(".category-label").addEventListener("click", (e) => {
  e.preventDefault();
  $(".category-select-area ul").classList.toggle("open-category");
  $(".category-select-area svg").classList.toggle("rotate");
});

// 로고 클릭시 tempData삭제
$(".header-logo").addEventListener("click", (e) => {
  deleteTempData();
});

// 카테고리 아코디언 선택
document.querySelectorAll(".category-content").forEach((level) => {
  level.addEventListener("click", (e) => {
    let selectOption = e.target.innerText;
    $(".category-label p").innerText = selectOption;
    $(
      ".category-label p"
    ).style.cssText = `font-size: 18px; font-weight: 500; color: #333;`;
    $(".category-select-area ul").classList.remove("open-category");
    $(".category-select-area svg").classList.remove("rotate");
  });
});

$(".btn-next").addEventListener("click", (e) => {
  e.preventDefault();
  const $titleValue = $(".title-input").value;
  const $levels = $(".level-label p").innerText;
  const $category = $(".category-label p").innerText;
  const $description = $(".description").value;
  const $thumbnail = getComputedStyle(
    $(".regist-thumbnail-area label")
  ).backgroundImage;

  console.log($thumbnail);

  if (
    !$titleValue ||
    !$description ||
    $levels === "난이도를 선택해주세요." ||
    $category === "카테고리를 선택해주세요." ||
    $thumbnail === "none"
  ) {
    $(".warning").style.cssText = `opacity: 1`;
    setTimeout(() => {
      $(".warning").style.cssText = `opacity: 0`;
    }, 2000);
    return;
  }

  const data = {
    title: $titleValue,
    level: $levels,
    category: $category,
    description: $description,
    thumbnail: $thumbnail.match(/url\(["']?(.*?)["']?\)/)[1],
  };

  const lectureId = checkQueryString();
  const previous = loadTempData();
  if (lectureId) {
    if (previous && previous.hasOwnProperty("curriculum")) {
      modifyTempData(data);
    } else {
      const lecture = loadSpecificData(lectureId);
      data.lectureId = lecture.lectureId;
      addTempData(data);
      modifyTempData({
        curriculum: lecture.curriculum,
        createdAt: lecture.createdAt,
      });
    }
    window.location.href = `/pages/curriculum/curriculum.html?id=${lectureId}`;
  } else {
    if (previous && previous.hasOwnProperty("curriculum")) {
      modifyTempData(data);
      window.location.href = "/pages/curriculum/curriculum.html";
    } else {
      data.lectureId = nanoid();
      addTempData(data);
      window.location.href = "/pages/curriculum/curriculum.html";
    }
  }
});

document.addEventListener("DOMContentLoaded", (e) => {
  const lectureId = checkQueryString();
  const sessionData = loadTempData();

  if (sessionData) {
    checkSessionData(sessionData);
  } else if (lectureId) {
    checkLocalData(lectureId);
  }
});
