#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');
const { program } = require('commander');
const prompts = require('prompts');
const { execSync } = require('child_process');

program
  .argument('[project-name]', '프로젝트 이름')
  .action(async (projectName) => {
    try {
      const name = projectName || (await prompts({
        type: 'text',
        name: 'value',
        message: '프로젝트 이름을 입력하세요:',
        validate: value => value.length > 0 ? true : '프로젝트 이름을 입력해주세요'
      })).value;

      if (!name) {
        console.error('프로젝트 이름이 필요합니다.');
        process.exit(1);
      }

      const targetPath = path.join(process.cwd(), name);
      const templatePath = path.join(__dirname, 'templates/default');

      if (await fs.pathExists(targetPath)) {
        console.error(`❌ 에러: "${name}" 디렉토리가 이미 존재합니다.`);
        process.exit(1);
      }

      console.log(`📦 ${name} 프로젝트를 생성하는 중...`);

      await fs.copy(templatePath, targetPath, {
        filter: (src) => {
          return true;
        }
      });

      const pkgPath = path.join(targetPath, 'package.json');
      const pkg = await fs.readJson(pkgPath);
      pkg.name = name;
      await fs.writeJson(pkgPath, pkg, { spaces: 2 });

      try {
        const currentHooksPath = execSync('git config --get core.hooksPath', {
          cwd: targetPath,
          encoding: 'utf8',
          stdio: ['pipe', 'pipe', 'ignore']
        }).trim();

        if (currentHooksPath !== '.githooks') {
          execSync('git config core.hooksPath .githooks', {
            cwd: targetPath,
            stdio: 'inherit'
          });
          console.log('✅ Git hooks 경로를 .githooks로 설정했습니다.');
        }
      } catch (error) {
        execSync('git config core.hooksPath .githooks', {
          cwd: targetPath,
          stdio: 'inherit'
        });
        console.log('✅ Git hooks 경로를 .githooks로 설정했습니다.');
      }

      console.log(`\n✅ ${name} 프로젝트가 생성되었습니다!\n`);
      console.log('다음 명령어를 실행하세요:\n');
      console.log(`  cd ${name}`);
      console.log('  pnpm install');
      console.log('  pnpm dev\n');
    } catch (error) {
      console.error('❌ 에러:', error.message);
      process.exit(1);
    }
  });

program.parse();
