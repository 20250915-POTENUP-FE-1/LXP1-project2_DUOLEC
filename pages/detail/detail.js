import { $ } from "/utils/common.js";

document.querySelectorAll(".btn-expand-lecture").forEach((expandBtn) => {
  expandBtn.addEventListener("click", (e) => {
    const $clickedChapter = e.target.closest(".chapter");
    $clickedChapter.classList.toggle("visible");
    const $icon = expandBtn.getElementsByTagName("svg")[0];
    $icon.classList.toggle("rotate");
  });
});
