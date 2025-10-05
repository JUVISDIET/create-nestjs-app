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
