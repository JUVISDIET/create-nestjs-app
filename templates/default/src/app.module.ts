import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule, LoggingInterceptor } from '@juvisdiet/logger';
import { ValidationModule } from '@juvisdiet/validation';
import { APP_INTERCEPTOR } from '@nestjs/core/constants';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ValidationModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local'],
      cache: true,
    }),
    LoggerModule.forRoot({
      level: process.env.NODE_ENV === 'local' ? 'trace' : 'info',
      buffer: {
        enabled: process.env.NODE_ENV !== 'local',
        minLength: 4096,
        flushInterval: 1000,
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
