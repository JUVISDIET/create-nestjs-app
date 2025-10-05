import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Health')
@Controller('health')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('liveness')
  getLiveness() {
    return this.appService.getLiveness();
  }

  @Get('readiness')
  getReadiness() {
    return this.appService.getReadiness();
  }
}
