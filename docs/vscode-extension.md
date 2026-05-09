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
| **Bun** | Oven | `oven.bun-vscode` | Bun 런타임 지원 및 디버거. TypeScript 파일 실행·디버그, 테스트 결과 인라인 표시, 실행 중 오류 위치를 에디터에서 바로 확인 |
| **Prettier - Code formatter** | Esben Petersen | `esbenp.prettier-vscode` | TS 코드 스타일(따옴표, 세미콜론 등) 자동 교정 |
| **ESLint** | Dirk Baeumer | `dbaeumer.vscode-eslint` | TS 문법 오류 및 안티 패턴 실시간 검사 |
| **EditorConfig for VS Code** | EditorConfig | `EditorConfig.EditorConfig` | `.editorconfig` 파일을 읽어 들여 들여쓰기, 줄 끝 문자, 인코딩 등 에디터 기본 설정을 팀 전체에 통일 |
| **Rainbow CSV** | mechatroner | `mechatroner.rainbow-csv` | CSV/TSV 파일의 각 열을 색상으로 구분하여 표시하고, SQL 유사 쿼리로 데이터를 조회할 수 있어 데이터 파일 검토가 용이 |
| **TSDoc Comment Generator** | Vicius | `vicius.tsdoc-gen` | TSDoc 형식의 주석을 자동 생성하여 함수·클래스·인터페이스에 대한 문서화를 편리하게 지원 |

> **`oven.bun-vscode` 설치가 필요한 이유**
> 본 프로젝트는 Bun 기반으로 개발됩니다. 이 확장 없이도 터미널에서 Bun 명령을 실행할 수 있지만,
> 설치 시 VSCode 내에서 직접 실행·디버깅이 가능해져 개발 편의성이 크게 향상됩니다.
> 팀 전체가 동일한 확장을 사용함으로써 개발 환경의 일관성도 유지할 수 있습니다.

### TypeScript 환경에서의 주요 기능

- **타입 가독성 향상**: 복잡한 Interface나 Type 정의를 가독성 좋게 자동 정렬
- **실시간 문법 체크**: ESLint와 연동하여 TypeScript 문법 오류를 코딩 중에 즉시 포착
- **협업 효율**: 모든 팀원이 동일한 `prettier` 규칙과 `.editorconfig` 설정을 사용하여 Git Diff 발생 최소화

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
2. `oven.bun-vscode` 검색 후 설치
3. `dbaeumer.vscode-eslint` 검색 후 설치
4. `esbenp.prettier-vscode` 검색 후 설치
5. `EditorConfig.EditorConfig` 검색 후 설치
6. `mechatroner.rainbow-csv` 검색 후 설치
7. `vicius.tsdoc-gen` 검색 후 설치

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
        "oven.bun-vscode",
        "dbaeumer.vscode-eslint",
        "esbenp.prettier-vscode",
        "EditorConfig.EditorConfig",
        "mechatroner.rainbow-csv",
        "vicius.tsdoc-gen"
      ],
      "settings": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": true
      }
    }
  }
}
```
