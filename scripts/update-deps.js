#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, '../templates/default/package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

const juvisdietPackages = [
  'cache', 'database', 'logger', 'server', 'storage', 'utils', 'validation'
];

console.log('🔍 @juvisdiet 패키지 최신 버전 확인 중...');

let hasUpdates = false;
const updates = [];

for (const pkg of juvisdietPackages) {
  const packageName = `@juvisdiet/${pkg}`;

  try {
    // npm 레지스트리에서 최신 버전 확인
    const latestVersion = execSync(
      `npm view ${packageName} version --registry=https://npm.pkg.github.com`,
      { encoding: 'utf8' }
    ).trim();

    const currentVersion = packageJson.dependencies[packageName];
    const currentVersionClean = currentVersion?.replace('^', '');

    if (currentVersionClean !== latestVersion) {
      console.log(`📦 ${packageName}: ${currentVersionClean} → ${latestVersion}`);
      packageJson.dependencies[packageName] = `^${latestVersion}`;
      updates.push({ package: packageName, from: currentVersionClean, to: latestVersion });
      hasUpdates = true;
    } else {
      console.log(`✅ ${packageName}: ${latestVersion} (최신)`);
    }
  } catch (error) {
    console.error(`❌ ${packageName} 버전 확인 실패:`, error.message);
  }
}

if (hasUpdates) {
  // package.json 업데이트
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

  console.log('\n✅ 의존성 업데이트 완료!');
  console.log('📦 업데이트된 패키지:');
  updates.forEach(u => console.log(`  - ${u.package}: ${u.from} → ${u.to}`));

  console.log('\n📝 changeset을 생성합니다...');

  // npx changeset 실행 (대화형)
  try {
    execSync('npx changeset', { stdio: 'inherit' });

    console.log('\n✅ changeset 생성 완료!');
    console.log('\n다음 단계:');
    console.log('1. git add .');
    console.log('2. git commit -m "chore: update @juvisdiet packages"');
    console.log('3. git push origin <branch-name>');
    console.log('4. PR 생성 및 merge');
    console.log('5. GitHub Actions가 자동으로 버전 업데이트 및 배포');
  } catch (error) {
    console.error('❌ changeset 생성 실패:', error.message);
    process.exit(1);
  }
} else {
  console.log('\n✅ 모든 패키지가 최신 버전입니다.');
}
