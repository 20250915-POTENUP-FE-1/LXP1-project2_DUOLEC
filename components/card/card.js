import { componentLoader } from "/components/componentLoader.js";

const COMPONENT_PATH = "/components";
const COMPONENT_NAME = "card";

async function createCard(data) {
  // 카드 컴포넌트 생성
  const cardElement = await componentLoader.loadComponent(
    COMPONENT_PATH,
    COMPONENT_NAME
  );

  cardElement.querySelector(".card").dataset.lectureId = data.lectureId;

  // 데이터 바인딩
  componentLoader.bindMultipleData(cardElement, {
    ".card-title": data.title,
    ".tag-text": data.category,
    ".card-author": data.authorId,
    ".card-thumbnail": { property: "src", value: data.thumbnail },
  });

  // 카드 클릭 이벤트
  componentLoader.attachEvent(cardElement, ".card", "click", data.onCardClick);

  // 카드 메뉴 버튼 클릭 이벤트
  componentLoader.attachEvent(
    cardElement,
    ".card-menu",
    "click",
    data.onCardMenuClick
  );

  // 수정 이벤트
  componentLoader.attachEvent(
    cardElement,
    ".btn-modify",
    "click",
    data.onModifyClick
  );

  // 삭제 이벤트
  componentLoader.attachEvent(
    cardElement,
    ".btn-delete",
    "click",
    data.onDeleteClick
  );

  return cardElement;
}

async function createCards(dataArray) {
  return Promise.all(dataArray.map((data) => createCard(data)));
}

export { createCard, createCards };
