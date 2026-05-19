# GTS (Google TypeScript Style) 가이드

## 개요

이 문서는 프로젝트에서 사용하는 gts(Google TypeScript Style)의 목적과 사용 방법을 설명합니다.

프로젝트에서는 코드 스타일과 정적 검사 규칙을 통일하기 위해 gts를 사용합니다. 새로 합류한 기여자도 동일한 방식으로 코드를 작성하고 검사할 수 있도록 일관된 개발 환경을 제공합니다.

---

## gts란?

gts는 Google TypeScript Style 기반의 코드 스타일 도구입니다.

프로젝트 내에서 다음과 같은 기능을 제공합니다.

- ESLint 기반 코드 검사
- Prettier 기반 코드 포맷팅
- TypeScript 프로젝트 스타일 통일
- 코드 자동 수정 기능 제공

---

## 왜 도입했는가?

프로젝트에서 여러 사람이 함께 작업하면 코드 작성 스타일이 달라질 수 있습니다.

예를 들어:

- 세미콜론 사용 여부
- 들여쓰기 방식
- 따옴표 사용 방식
- 코드 정렬 방식

이런 차이가 많아지면 코드 리뷰와 유지보수가 어려워질 수 있습니다.

gts를 사용하면 이러한 규칙을 자동으로 통일할 수 있습니다.

목적:

- 코드 스타일 통일
- 리뷰 부담 감소
- 협업 효율 향상
- 자동 포맷팅 제공

---

## 프로젝트에서 사용하는 스크립트

package.json에는 다음 스크립트가 등록되어 있습니다.

```json
{
  "scripts": {
    "lint": "gts lint",
    "fix": "gts fix"
  }
}
```

### 코드 검사

```bash
bun run lint
```

실행 내용:

- ESLint 검사 수행
- 스타일 규칙 위반 여부 확인
- 오류 출력

---

### 자동 수정

```bash
bun run fix
```

실행 내용:

- 가능한 스타일 문제 자동 수정
- Prettier 포맷 적용
- ESLint 자동 수정 적용

---

## 프로젝트 설정 파일 구조

프로젝트에서는 gts 기본 설정 위에 추가 설정을 적용합니다.

### eslint.config.cjs

현재 프로젝트:

```js
module.exports = [...customConfig, ...require('gts')];
```

동작 방식:

1. eslint.ignores.cjs 존재 여부 확인
2. 존재하면 ignore 규칙 로드
3. gts 기본 설정 추가

즉:

프로젝트 설정 + gts 기본 설정 구조를 사용합니다.

---

### eslint.ignores.cjs

역할:

- ESLint 검사 제외 파일 지정

예:

```js
module.exports = [
  'dist/**',
  'node_modules/**'
];
```

실제 프로젝트에서 필요한 파일을 추가하여 사용합니다.

---

### .prettierrc.cjs

현재 프로젝트:

```js
module.exports = {
  ...require('gts/.prettierrc.json'),
};
```

설명:

프로젝트는 gts의 기본 Prettier 설정을 그대로 사용합니다.

별도의 추가 규칙이 필요한 경우 여기에 추가 가능합니다.

예:

```js
module.exports = {
  ...require('gts/.prettierrc.json'),
  printWidth: 100,
};
```

---

## 새로 합류한 기여자가 확인할 사항

프로젝트를 처음 실행하는 경우:

### 의존성 설치

```bash
bun install
```

---

### 코드 검사 실행

```bash
bun run lint
```

오류가 없는지 확인합니다.

---

### 자동 수정 실행

```bash
bun run fix
```

자동 수정 가능한 항목을 먼저 정리합니다.

---

### 타입 검사

```bash
bun run typecheck
```

TypeScript 타입 오류가 없는지 확인합니다.

---

## 자주 사용하는 명령어 요약

| 명령 | 설명 |
|---|---|
| bun install | 의존성 설치 |
| bun run lint | 코드 스타일 검사 |
| bun run fix | 자동 수정 수행 |
| bun run typecheck | 타입 검사 |

---

## 정리

- gts는 코드 스타일 통일을 위한 도구입니다.
- 프로젝트에서는 ESLint와 Prettier 설정을 제공합니다.
- `bun run lint`로 검사할 수 있습니다.
- `bun run fix`로 자동 수정할 수 있습니다.
- 프로젝트 추가 설정은 `eslint.config.cjs`, `eslint.ignores.cjs`, `.prettierrc.cjs`에서 관리합니다.

---

## 참고 자료

- https://github.com/google/gts
- https://eslint.org
- https://prettier.io
