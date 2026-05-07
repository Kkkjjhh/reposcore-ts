# TSDoc + TypeDoc 가이드

## TSDoc이란?
TSDoc은 TypeScript 코드에 주석을 일정한 형식으로 작성하기 위한 규칙입니다.

함수, 클래스, 인터페이스, 타입 등에 설명을 붙여서
코드를 읽는 사람이 역할과 사용 방법을 더 쉽게 이해할 수 있도록 도와줍니다.

즉, **TSDoc은 주석 작성 규칙**입니다.

---

## TypeDoc이란?
TypeDoc은 TypeScript 코드와 주석을 읽어서
문서 형태로 정리해 주는 도구입니다.

즉,

- **TSDoc**: 주석을 어떤 형식으로 쓸지에 대한 규칙
- **TypeDoc**: 그 주석을 바탕으로 문서를 생성하는 도구

라고 이해하면 됩니다.

---

## TSDoc 기본 주석 형식 예시

### 함수 설명 예시

```ts
/**
 * 사용자 점수를 계산합니다.
 * @param name 사용자 이름
 * @param score 점수
 * @returns 계산 결과 문자열
 * @example
 * calculateScore("kim", 10)
 */
function calculateScore(name: string, score: number): string {
  return `${name}: ${score}`;
}
```

### 자주 쓰는 태그
- `@param`: 매개변수 설명
- `@returns`: 반환값 설명
- `@example`: 사용 예시

---

## TypeScript 코드에 주석을 작성하는 예시

### 클래스 예시

```ts
/**
 * 사용자 정보를 저장하는 클래스입니다.
 */
class User {
  /**
   * 사용자 이름
   */
  name: string;

  /**
   * 사용자 점수
   */
  score: number;

  constructor(name: string, score: number) {
    this.name = name;
    this.score = score;
  }
}
```

### 타입 예시

```ts
/**
 * 사용자 점수 정보
 */
type UserScore = {
  /** 사용자 이름 */
  name: string;
  /** 계산된 점수 */
  score: number;
};
```

---

## TypeDoc 설치 및 실행 방법

### 설치 예시

```bash
bun add -d typedoc
```

### 실행 예시

```bash
bunx typedoc index.ts
```

또는 프로젝트에 맞는 실행 방법을 사용할 수 있습니다.

---

## 문서 생성 결과물이 저장되는 위치 예시

예시:
- `docs/api/`
- TypeDoc 기본 출력 폴더

---

## 이 저장소에서 주석을 작성할 때의 간단한 규칙

- 공개 함수나 주요 타입에는 설명을 작성합니다.
- 매개변수와 반환값이 있는 경우 `@param`, `@returns`를 작성합니다.
- 불필요하게 긴 주석은 피하고 핵심만 작성합니다.

---

## 참고 자료

- [TSDoc 공식 문서](https://tsdoc.org/)
- [TypeDoc 공식 문서](https://typedoc.org/)
- [TSDoc 공식 GitHub 저장소](https://github.com/microsoft/tsdoc)
- [TypeDoc 공식 GitHub 저장소](https://github.com/TypeStrong/typedoc)
