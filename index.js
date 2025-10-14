const $ = (selector) => document.querySelector(selector);

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
