# LXP 플랫폼 프로젝트 1

## **1. 코딩 스타일 컨벤션**

코드의 일관성을 유지하여 가독성을 높입니다.

- **Formatter**: **Prettier** 사용을 권장합니다.
  - 들여쓰기(indent)는 2칸(spaces)으로 설정합니다.
  - 문자열은 작은따옴표(`'`)를 사용합니다.
  - 코드 마지막에는 세미콜론(`;`)을 붙입니다.
  - ESLint와 통합하여 코드 스타일을 강제하고 잠재적 오류를 방지합니다.

## **2. 네이밍 컨벤션**

이름만 보고도 역할과 유형을 파악할 수 있도록 규칙을 정합니다.

- **함수 및 변수 (Functions, Variables)**: **카멜 케이스(camelCase)**
  - `Example: const userName; function getUserInfo() {}`
- **CSS 클래스 (CSS Classes)**: **케밥 케이스(kebab-case)**
  - `Example (kebab-case): .user-profile`
- **상수 (Constants)**: **스네이크 대문자 케이스(SNAKE_UPPER_CASE)**
  - `Example: const MAX_USER_COUNT = 10;`

## **3. 커밋 메시지 컨벤션**

커밋 기록을 명확하게 하여 변경 사항을 쉽게 추적합니다.

- **형식**: `타입: 제목`
- **타입 종류**:
  - **feat**: 새로운 기능 추가
    - `feat: 로그인 페이지 UI 구현`
  - **fix**: 버그 수정
    - `fix: 메인 페이지 이미지 로딩 오류 해결`
  - **style**: 코드 스타일 수정 (포맷팅, 세미콜론 등)
    - `style: Prettier 적용 및 코드 포맷팅`
  - **refactor**: 코드 리팩토링 (기능 변경 없음)
    - `refactor: 공통 로직 커스텀 훅으로 분리`
  - **docs**: 문서 수정
    - `docs: README.md 프로젝트 설명 업데이트`
  - **chore**: 빌드, 패키지 매니저 설정 등 기타 작업
    - `chore: ESLint 설정 추가`

test
