import { $ } from "/utils/common.js";
import { loadDummyData } from "/utils/load.js";
import { createCards } from "/components/card/card.js";
import { loadStorageData } from "./utils/local.js";

let [category, setCategory] = ["전체", (input) => (category = input)];
let [level, setLevel] = ["전체", (input) => (level = input)];
let [sort, setSort] = ["인기순", (input) => (sort = input)];
let lectures = [];

// 필터링 조건에 맞는 카드 로드 함수(초기에는 전체 로드)
async function loadCards() {
  let filtered = lectures;
  if (category !== "전체") {
    filtered = filtered.filter((lecture) => lecture.category === category);
  }
  if (level !== "전체") {
    filtered = filtered.filter((lecture) => lecture.level === level);
  }
  if (sort === "최신순") {
    filtered = filtered.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  } else if (sort === "인기순") {
    filtered = filtered.sort((a, b) => b.enrollmentCount - a.enrollmentCount);
  }

  deleteCards();

  const cardDatas = filtered.map((lecture) => {
    return {
      lectureId: lecture.lectureId,
      title: lecture.title,
      category: lecture.category,
      authorId: lecture.authorId,
      thumbnail: lecture.thumbnail,
      onCardClick: () => {
        window.location.href = `/pages/detail/detail.html?id=${lecture.lectureId}`;
      },
      onCardMenuClick: (e) => {
        e.preventDefault();
        e.stopPropagation();
        openCardMenu(e);
      },
      onModifyClick: (e) => {
        console.log("수정 클릭");
      },
      onDeleteClick: (e) => {
        console.log("삭제 클릭");
      },
    };
  });

  const cardList = await createCards(cardDatas);

  cardList.forEach((card) => {
    $(".main-list-grid").appendChild(card);
  });
}

// 카드들을 재랜더링 하기 전, 모든 카드 삭제 함수
function deleteCards() {
  document
    .querySelectorAll(".card")
    .forEach((card) => card.parentElement.remove());
}

// 카테고리 선택 함수
function selectCategory(e) {
  const $seletedCategory = e.target.closest(".main-category-item");
  const $categories = document.querySelectorAll(".main-category-item");
  $categories.forEach((category) => {
    category.classList.remove("selected");
  });
  $seletedCategory.classList.add("selected");
  setCategory($seletedCategory.dataset["value"]);
  loadCards();
}

// 난이도 필터 선택 함수
function selectLevel($levelLabel) {
  const $levels = document.querySelectorAll(".level-label");
  $levels.forEach((option) => {
    option.classList.remove("selected");
  });
  $levelLabel.classList.add("selected");
  setLevel($levelLabel.innerText);
  $(".level-text").innerText = `난이도 ${$levelLabel.innerText}`;

  loadCards();
  toggleLevelFilter();
}

// 정렬 필터 선택 함수
function selectSort($sortLabel) {
  const $sorts = document.querySelectorAll(".sort-label");
  $sorts.forEach((option) => {
    option.classList.remove("selected");
  });
  $sortLabel.classList.add("selected");
  setSort($sortLabel.innerText);
  $(".sort-text").innerText = `${$sortLabel.innerText}`;
  loadCards();
  toggleSortFilter();
}

// 난이도 필터 모달 토글 함수
function toggleLevelFilter() {
  const $levelOptions = $(".level-options");
  $levelOptions.classList.toggle("visible");
  $(".btn-level i").classList.toggle("rotate");
}

// 정렬 필터 모달 토글 함수
function toggleSortFilter() {
  const $levelOptions = $(".sort-options");
  $levelOptions.classList.toggle("visible");
}

// 강의 수정/삭제 메뉴 모달 오픈 함수
function openCardMenu(e) {
  document.querySelectorAll(".card-menu-options").forEach((node) => {
    node.classList.remove("visible");
  });
  const $card = e.target.closest(".card");
  const $cardMenuOptions = $card.getElementsByClassName("card-menu-options")[0];
  $cardMenuOptions.classList.add("visible");
}

// 난이도 필터 버튼 온오프 클릭 이벤트 등록
$(".btn-level").addEventListener("click", (e) => {
  e.preventDefault();
  toggleLevelFilter();
});

// 정렬 필터 버튼 온오프 클릭 이벤트 등록
$(".btn-sort").addEventListener("click", (e) => {
  e.preventDefault();
  toggleSortFilter();
});

document.querySelectorAll(".main-category-item").forEach(($category) => {
  $category.addEventListener("click", (e) => {
    e.preventDefault();
    selectCategory(e);
  });
});

// 난이도 필터 옵션 선택 클릭 이벤트 등록
document.querySelectorAll(".level-label").forEach(($levelLabel) => {
  $levelLabel.addEventListener("click", (e) => {
    e.preventDefault();
    selectLevel($levelLabel);
  });
});

// 정렬 필터 옵션 선택 클릭 이벤트 등록
document.querySelectorAll(".sort-label").forEach(($sortLabel) => {
  $sortLabel.addEventListener("click", (e) => {
    e.preventDefault();
    selectSort($sortLabel);
  });
});

// 강의 수정/삭제 메뉴 모달 온오프 클릭 이벤트 등록
document.querySelectorAll(".card-menu").forEach((cardMenu) => {
  cardMenu.addEventListener("click", (e) => {
    e.preventDefault();
    openCardMenu(e);
  });
});

// 모달 바깥 클릭 시 모달 오프 클릭 이벤트 등록
document.addEventListener("click", (e) => {
  // 난이도 필터 닫기
  const isLevelFilter = e.target.closest(".level");
  if (!isLevelFilter) {
    $(".level-options").classList.remove("visible");
    $(".btn-level i").classList.remove("rotate");
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

// 초기 데이터 로드
document.addEventListener("DOMContentLoaded", async () => {
  lectures = loadStorageData() || (await loadDummyData()) || [];
  await loadCards();
});
