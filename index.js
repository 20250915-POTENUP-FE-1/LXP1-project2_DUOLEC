import { $ } from "/utils/common.js";

let [level, setLevel] = ["전체", (input) => (level = input)];
let [sort, setSort] = ["인기순", (input) => (sort = input)];

function toggleLevelFilter() {
  const $levelOptions = $(".level-options");
  $levelOptions.classList.toggle("visible");
}

function toggleSortFilter() {
  const $levelOptions = $(".sort-options");
  $levelOptions.classList.toggle("visible");
}

function openCardMenu(e) {
  document.querySelectorAll(".card-menu-options").forEach((node) => {
    node.classList.remove("visible");
  });
  const $card = e.target.closest(".card");
  const $cardMenuOptions = $card.getElementsByClassName("card-menu-options")[0];
  $cardMenuOptions.classList.add("visible");
}

// 난이도 필터 옵션 온오프
$(".btn-level").addEventListener("click", (e) => {
  e.preventDefault();
  toggleLevelFilter();
});

// 정렬 필터 옵션 온오프
$(".btn-sort").addEventListener("click", (e) => {
  e.preventDefault();
  toggleSortFilter();
});

// 난이도 필터 옵션 선택
document.querySelectorAll(".level-label").forEach(($levelLabel) => {
  $levelLabel.addEventListener("click", (e) => {
    e.preventDefault();
    const $levels = document.querySelectorAll(".level-label");
    $levels.forEach((option) => {
      option.classList.remove("selected");
    });
    $levelLabel.classList.add("selected");
    setLevel($levelLabel.innerText);
    $(".level-text").innerText = `난이도 ${$levelLabel.innerText}`;
    toggleLevelFilter();
  });
});

// 정렬 필터 옵션 선택
document.querySelectorAll(".sort-label").forEach(($sortLabel) => {
  $sortLabel.addEventListener("click", (e) => {
    e.preventDefault();
    const $sorts = document.querySelectorAll(".sort-label");
    $sorts.forEach((option) => {
      option.classList.remove("selected");
    });
    $sortLabel.classList.add("selected");
    setSort($sortLabel.innerText);
    $(".sort-text").innerText = `${$sortLabel.innerText}`;
    toggleSortFilter();
  });
});

// 강의 수정/삭제 메뉴 모달 온오프
document.querySelectorAll(".card-menu").forEach((cardMenu) => {
  cardMenu.addEventListener("click", (e) => {
    e.preventDefault();
    openCardMenu(e);
  });
});

// 모달 바깥 클릭 시 모달 오프
document.addEventListener("click", (e) => {
  // 난이도 필터 닫기
  const isLevelFilter = e.target.closest(".level");
  if (!isLevelFilter) {
    $(".level-options").classList.remove("visible");
  }
  // 정렬 필터 닫기
  const isSortFilter = e.target.closest(".sort");
  if (!isSortFilter) {
    $(".sort-options").classList.remove("visible");
  }

  // 카드 메뉴 닫기
  const isCardMenu = e.target.closest(".card-menu");
  if (!isCardMenu) {
    document.querySelectorAll(".card-menu-options").forEach((node) => {
      node.classList.remove("visible");
    });
  }
});
