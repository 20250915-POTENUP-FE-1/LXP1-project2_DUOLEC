import { $ } from "/utils/common.js";
import { addTempData, loadTempData } from "/utils/session.js";

function checkSessionData() {
  const sessionData = loadTempData();
  const $title = $(".title-input");
  const $levels = $(".level-label p");
  const $category = $(".category-label p");
  const $description = $(".description");
  if (sessionStorage.length > 1) {
    $title.value = sessionData.title;
    $levels.innerText = sessionData.level;
    $category.innerText = sessionData.category;
    $description.value = sessionData.description;
    $(
      ".category-label p"
    ).style.cssText = `font-size: 18px; font-weight: 500; color: #333;`;
    $(
      ".level-label p"
    ).style.cssText = `font-size: 18px; font-weight: 500; color: #333;`;
  }
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

// 카테고리 아코디언 토글
$(".category-label").addEventListener("click", (e) => {
  e.preventDefault();
  $(".category-select-area ul").classList.toggle("open-category");
  $(".category-select-area svg").classList.toggle("rotate");
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
  const $category = $(".category-label p").innerText.replace(" ", "");
  const $description = $(".description").value;
  const data = {
    title: $titleValue,
    level: $levels,
    category: $category,
    description: $description,
  };
  addTempData(data);
  window.location.href = "/pages/curriculum/curriculum.html";
});

checkSessionData();
