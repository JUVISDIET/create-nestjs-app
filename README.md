# @juvis/create-nestjs-app

Juvis NestJS 프로젝트 템플릿 생성 CLI

## 사용법

### npm

```bash
npm init @juvis/nestjs-app my-project
```

### npx

```bash
npx @juvis/create-nestjs-app my-project
```

### 로컬 테스트

```bash
node index.js my-project
```

## 생성되는 파일

- `.githooks/` - Git 훅 설정
- `.vscode/` - VSCode 설정
- `.env.local` - 환경 변수 템플릿
- `.gitignore` - Git 무시 파일
- `.npmrc` - npm 설정
- `.nvmrc` - Node 버전
- `.prettierrc` - Prettier 설정
- `eslint.config.mjs` - ESLint 설정
- `nest-cli.json` - NestJS CLI 설정
- `package.json` - 패키지 정보
- `pnpm-workspace.yaml` - pnpm 워크스페이스 설정
- `tsconfig.json` - TypeScript 설정
- `src/` - 소스 코드
- `test/` - 테스트 코드

## 프로젝트 시작

```bash
cd my-project
pnpm install
pnpm dev
```

## 개발자 가이드

### 자동 배포 시스템

이 프로젝트는 changeset 기반 자동 배포 시스템을 사용합니다.

#### 의존성 업데이트 워크플로우

**1. 의존성 자동 업데이트**
```bash
# 새 브랜치 생성
git checkout -b feat/update-deps

# @juvisdiet 패키지 최신 버전 확인 및 업데이트
npm run update-deps
```

이 명령은 다음을 수행합니다:
- `@juvisdiet/*` 패키지의 최신 버전을 확인
- `templates/default/package.json` 자동 업데이트
- changeset 대화형 생성 (버전 타입 선택)

**2. Changeset 생성**
업데이트가 있으면 대화형 프롬프트가 나타납니다:
- 패키지 선택: `@juvisdiet/create-nestjs-app`
- 버전 타입 선택:
  - `patch` (1.1.0 → 1.1.1): 버그 수정, 의존성 업데이트
  - `minor` (1.1.0 → 1.2.0): 새로운 기능 추가
  - `major` (1.1.0 → 2.0.0): Breaking changes
- 변경 내용 요약 입력

**3. PR 생성 및 Merge**
```bash
git add .
git commit -m "chore: update @juvisdiet packages"
git push origin feat/update-deps
```
- GitHub에서 PR 생성
- 리뷰 후 main 브랜치에 merge

**4. 자동 배포**
main에 merge되면 GitHub Actions가 자동으로:
1. Changeset 적용 (package.json 버전 업데이트)
2. 변경사항 커밋 및 push
3. GitHub Packages에 배포

#### 수동 버전 관리

의존성 업데이트 없이 직접 changeset을 생성할 수도 있습니다:

```bash
npm run changeset
```

#### 스크립트

- `npm run update-deps` - @juvisdiet 패키지 자동 업데이트
- `npm run changeset` - 수동 changeset 생성
- `npm run version` - changeset 적용 (CI에서 사용)
- `npm run release` - npm publish (CI에서 사용)

#### 주의사항

- changeset 파일은 `.changeset/*.md` 형식으로 생성됩니다
- 버전 업데이트 커밋은 `[skip ci]`가 자동 추가되어 무한 루프를 방지합니다
- GitHub Packages 배포는 `GITHUB_TOKEN`을 사용하여 자동 인증됩니다
