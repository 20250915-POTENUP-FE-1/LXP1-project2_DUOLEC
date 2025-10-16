class ComponentLoader {
  constructor() {
    this.loadedStyles = new Set();
  }

  /**
   * HTML 파일 로드 -> 문자열 변환
   * @param {*} path HTML 파일 경로
   * @returns {string} HTML 문자열
   */
  async loadHTML(path) {
    try {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`컴포넌트 로드 오류: ${path}`);
      }
      return await response.text();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * CSS 파일 로드 및 적용
   * @param {*} path CSS 파일 경로
   * @returns {Promise}
   */
  async loadCSS(path) {
    if (this.loadedStyles.has(path)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = path;
      link.onload = () => {
        this.loadedStyles.add(path);
        resolve();
      };
      link.onerror = () => {
        reject(new Error(`스타일 로드 오류: ${path}`));
      };
      document.head.appendChild(link);
    });
  }

  /**
   * HTML 문자열 -> DOM 요소 변환
   * @param {*} htmlString
   * @returns {Element} DOM 요소
   */
  parseHTML(htmlString) {
    const template = document.createElement("template");
    template.innerHTML = htmlString.trim();
    return template.content.firstElementChild;
  }

  /**
   * 데이터를 요소에 바인딩
   * @param {Element} element 바인딩할 요소의 부모
   * @param {*} data 바인딩할 요소의 데이터
   * @param {string} selector 바인딩 할 요소의 선택자
   * @param {string} property 바인딩할 데이터가 속하는 속성(기본값 : textContent)
   */
  bindData(element, data, selector, property = "textContent") {
    const targetElement = element.querySelector(selector);
    if (targetElement && data !== undefined && data !== null) {
      targetElement[property] = data;
    }
  }

  /**
   * 여러 데이터를 한번에 바인딩
   * @param {Element} element
   * @param {Object} bindings 바인딩할 요소로 이루어진 객체 {key(선택자) : value(바인딩할 데이터), ...}
   */
  bindMultipleData(element, bindings) {
    Object.entries(bindings).forEach(([selector, data]) => {
      // 바인딩할 데이터(data)가 객체일 경우
      if (typeof data === "object" && data.value !== undefined) {
        this.bindData(
          element,
          data.value,
          selector,
          data.property || "textContent"
        );
      } else {
        // 객체가 아니라면 단순히 Text 데이터 바인딩
        this.bindData(element, data, selector);
      }
    });
  }

  /**
   * 요소에 이벤트 추가하는 함수
   * @param {Element} element 이벤트를 붙일 요소의 부모
   * @param {string} selector 이벤트를 붙일 요소 선택자
   * @param {string} event 붙일 이벤트 종류 click, input, 등등
   * @param {Function} handler 붙일 이벤트 함수
   */
  attachEvent(element, selector, event, handler) {
    const targetElement = element.querySelector(selector);
    if (targetElement) {
      targetElement.addEventListener(event, handler);
    }
  }

  /**
   * 컴포넌트 로드 함수
   * @param {string} basePath 컴포넌트 폴더가 위치한 기본 경로
   * @param {string} componentName 컴포넌트 폴더 이름
   * @returns HTML, CSS이 반영된 컴포넌트 반환
   */
  async loadComponent(basePath = "/components", componentName) {
    const htmlPath = `${basePath}/${componentName}/${componentName}.html`;
    const cssPath = `${basePath}/${componentName}/${componentName}.css`;

    const [html] = await Promise.all([
      this.loadHTML(htmlPath),
      this.loadCSS(cssPath),
    ]);

    return this.parseHTML(html);
  }
}

export const componentLoader = new ComponentLoader();

/**
 * 사용 예시
 * // card.js
 * import { componentLoader } from "/components/componentLoader.js";
 *
 * async function createCard(data){
 *  const cardElement = await componentLoader.loadComponent();
 *
 *  // 하나씩 바인딩
 *  componentLoader.bindData(cardElement, data.title, ".card-title");
 *  componentLoader.bindData(cardElement, data.authorId, ".author");
 *  // 여러개 작성...
 *
 *  // 한번에 여러개 바인딩
 *  componentLoader.bindMultipleData(cardElement, {
 *      '.card-title': data.title,
 *      '.author': data.authorId,
 *       // 여러개 작성...
 *  })
 *
 *  // 이벤트 등록
 *  if(data.onClick){
 *    componentLoader.attachEvent(cardElement, '.card', 'click', data.onClick)
 *  }
 *  return cardElement;
 * }
 *
 * // 여러 카드 한번에 생성하는 함수
 * export async function createCards(dataArray) {
 *  return Promise.all(dataArray.map(data => createCard(data)));
 * }
 *
 *
 * // index.js
 * const card = await createCard({
 *  title: '제목',
 *  authorId: '내용',
 *  onClick: () => console.log('카드 클릭!')
 * });
 * document.getElementById('container').appendChild(card);
 */
