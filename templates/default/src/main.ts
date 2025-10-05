import { JuvisBootstrap } from '@juvisdiet/server';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await JuvisBootstrap.create(AppModule, {
    server: {
      port: process.env.PORT || 3000,
      validation: {
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      },
      swagger: {
        enabled: process.env.NODE_ENV !== 'production',
        title: '이곳에 API 제목을 입력하세요',
        description: '이곳에 API 설명을 입력하세요',
        version: '1.0',
        path: 'api',
        customSiteTitle: '이곳에 Swagger 문서 제목을 입력하세요',
      },
      cors: {
        origin: process.env.CORS_ORIGINS?.split(','),
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-API-KEY'],
        maxAge: 86400,
      },
      helmet: {
        enabled: true,
        mode: process.env.NODE_ENV === 'development' ? 'dev' : 'api',
      },
      auth: {
        keycloak: {
          enabled: true,
        },
        roleHierarchy: {
          roles: ['admin', 'manager', 'staff', 'user'],
        },
      },
    },
  });

  await JuvisBootstrap.listen(app);
}

bootstrap().catch((err) => {
  console.error('서버 시작 오류:', err);
  process.exit(1);
});
