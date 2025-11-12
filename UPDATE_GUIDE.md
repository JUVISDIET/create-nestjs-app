# @juvisdiet 패키지 업데이트 가이드

## 개요
이 가이드는 @juvisdiet core 패키지들이 업데이트되었을 때, create-nestjs-app 템플릿의 의존성을 자동으로 업데이트하는 방법을 설명합니다.

## 사용법

### 1. 의존성 업데이트 확인 및 적용
```bash
npm run update-deps
```

이 명령어는:
- 모든 @juvisdiet 패키지의 최신 버전을 확인
- 업데이트가 필요한 패키지만 변경
- 업데이트가 있으면 자동으로 `npx changeset` 실행
- 버전 증가 타입 선택 (patch/minor/major)

### 2. 변경사항 커밋 및 푸시
```bash
git add .
git commit -m "chore: update @juvisdiet packages"
git push origin <branch-name>
```

### 3. PR 생성 및 머지
- GitHub에서 PR 생성
- 리뷰 후 main 브랜치로 머지

### 4. 자동 버전 업데이트 및 배포
PR이 main 브랜치로 머지되면 GitHub Actions가 자동으로:
- changeset 파일을 읽어서 버전 업데이트
- CHANGELOG.md 자동 생성/업데이트
- 새 버전을 npm 레지스트리에 배포
- 릴리즈 노트 생성

## 전체 워크플로우

```
core 패키지 업데이트 발생
↓
npm run update-deps (로컬)
↓
버전 타입 선택 (patch/minor/major)
↓
git commit & push (로컬)
↓
PR 생성 & 머지 (GitHub)
↓
자동 버전 업데이트 & 배포 (GitHub Actions)
```

## 주요 파일

- `scripts/update-deps.js` - 의존성 업데이트 스크립트
- `.changeset/config.json` - changeset 설정
- `.github/workflows/release.yml` - 자동 배포 워크플로우
- `templates/default/package.json` - 업데이트 대상 파일

## 참고사항

- 업데이트가 없으면 "모든 패키지가 최신 버전입니다" 메시지 출력
- 업데이트가 있으면 자동으로 changeset 생성 프로세스 시작
- 버전 타입 선택: patch (1.1.0 → 1.1.1), minor (1.1.0 → 1.2.0), major (1.1.0 → 2.0.0)
- 버전 업데이트와 배포는 GitHub Actions에서 자동 처리
- main 브랜치 푸시 시에만 자동 배포 실행
