# TypeScript 개발을 위한 VSCode 확장 가이드

## 📌 개요

우리 프로젝트는 **TypeScript**를 기반으로 진행됩니다.  
코드의 엄격한 타입 체크와 일관된 코드 스타일 유지를 위해 아래 확장 프로그램을 설치해 주세요.  
**GitHub Codespaces**와 **Local** 환경 모두 동일하게 적용됩니다.

---

## 🧩 필수 확장 프로그램 (⭐)

쾌적한 TypeScript 개발 환경과 팀 내 코드 컨벤션 통일을 위해 다음 확장을 반드시 설치해야 합니다.

| 확장 이름 | 게시자 | 설치 ID | 역할 |
|---|---|---|---|
| **Prettier - Code formatter** | Esben Petersen | `esbenp.prettier-vscode` | TS 코드 스타일(따옴표, 세미콜론 등) 자동 교정 |
| **ESLint** | Microsoft | `dbaeumer.vscode-eslint` | TS 문법 오류 및 안티 패턴 실시간 검사 |

### TypeScript 환경에서의 주요 기능

- **타입 가독성 향상**: 복잡한 Interface나 Type 정의를 가독성 좋게 자동 정렬
- **실시간 문법 체크**: ESLint와 연동하여 TypeScript 문법 오류를 코딩 중에 즉시 포착
- **협업 효율**: 모든 팀원이 동일한 `prettier` 규칙을 사용하여 Git Diff 발생 최소화

---

## 💻 설정 방법 (Format On Save)

TypeScript 코드를 저장할 때마다 자동으로 스타일이 정리되도록 아래 설정을 권장합니다.

1. **설정 열기**: `Ctrl + ,` (macOS: `Cmd + ,`)
2. **Default Formatter**: `Editor: Default Formatter`를 `Prettier - Code formatter`로 선택
3. **저장 시 자동 정렬**: `Editor: Format On Save` 항목 체크
4. **코드 액션 자동화 (선택)**: `Editor: Code Actions On Save`에서 `source.fixAll.eslint`를 설정하면 저장 시 문법 오류도 자동 수정됩니다.

---

## ☁️ Codespaces 환경

### 특징

- **환경 일관성**: `.devcontainer/devcontainer.json`을 통해 TypeScript 컴파일러와 필수 확장이 자동으로 세팅됩니다.
- **즉시 시작**: 별도의 Node.js 설치나 환경 설정 없이 브라우저에서 바로 TS 코딩이 가능합니다.

---

### UI에서 수동 설치 방법

1. 확장 메뉴 열기 (`Ctrl + Shift + X`)
2. `esbenp.prettier-vscode` 검색 후 설치
3. `dbaeumer.vscode-eslint` 검색 후 설치

---

## 🔄 Rebuild 가이드

### 📌 환경 업데이트가 필요한 경우

- `package.json`에 새로운 라이브러리가 추가되었거나, `devcontainer` 설정이 변경된 경우 **Rebuild**를 권장합니다.
- 방법: `Ctrl + Shift + P` -> `Codespaces: Rebuild Container` 실행

---

## ⚙️ 프로젝트 자동 설정 공유 (devcontainer.json)

프로젝트 루트의 `.devcontainer/devcontainer.json` 파일에 아래 내용을 추가하여 팀원들의 환경을 자동화합니다.
```json
{
  "name": "TypeScript Project",
  "customizations": {
    "vscode": {
      "extensions": [
        "esbenp.prettier-vscode",
        "dbaeumer.vscode-eslint"
      ],
      "settings": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": true
      }
    }
  }
}
