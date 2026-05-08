# TypeScript 코딩 컨벤션 가이드

> 본 문서는 프로젝트 전체에서 일관된 TypeScript 코드 스타일을 유지하기 위한 컨벤션을 정의합니다.
> 세부적인 규칙은 [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)를 참고하세요.

---

## 네이밍 규칙

| 대상 | 규칙 | 예시 |
|---|---|---|
| 변수 | camelCase | `userName`, `issueCount` |
| 함수 | camelCase | `getIssues()`, `calculateScore()` |
| 클래스 | PascalCase | `GitHubService`, `ScoreCalculator` |
| 인터페이스 | PascalCase | `UserScore`, `IssueData` |
| 타입 | PascalCase | `ScoreResult`, `RepoInfo` |
| 상수 | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT`, `DEFAULT_TIMEOUT` |
| 파일명 | kebab-case | `github-service.ts`, `score-calculator.ts` |

---

## 타입 정의 방식 (interface vs type)

- **interface** → 객체 형태의 타입 정의에 사용
- **type** → 유니온, 인터섹션 등 복잡한 타입 정의에 사용

```typescript
// interface 사용 (객체 형태)
interface UserScore {
  userId: string;
  totalScore: number;
  prCount: number;
  issueCount: number;
}

// type 사용 (유니온 타입)
type OutputFormat = 'csv' | 'json' | 'table';
```

---

## 함수 작성 방식

- 일반적으로 **arrow function** 사용을 권장합니다.
- 비동기 함수는 **async/await** 를 사용합니다.

```typescript
// arrow function
const calculateScore = (prCount: number, issueCount: number): number => {
  return prCount * 3 + issueCount;
};

// async/await
const getIssues = async (repo: string): Promise<Issue[]> => {
  const issues = await fetchIssues(repo);
  return issues;
};
```

---

## import/export 규칙

- **named export** 를 기본으로 사용합니다.
- `index.ts` 에서 모듈을 한곳에 모아 re-export 합니다.

```typescript
// named export
export const calculateScore = () => { ... };
export interface UserScore { ... }

// import
import { calculateScore, UserScore } from './score-calculator';
```

---

## 기본 코드 스타일

- 들여쓰기: **2 spaces**
- 세미콜론: **항상 사용**
- 따옴표: **single quote (`'`)** 사용
- 한 줄 최대 **100자** 권장

```typescript
// Good
const userName = 'user1';
const score = calculateScore(3, 2);

// Bad
const userName = "user1"
const score = calculateScore(3,2)
```

---

## 참고 자료

- [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)
- [TypeScript 공식 문서](https://www.typescriptlang.org/docs/)
