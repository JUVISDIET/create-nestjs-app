import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getLiveness() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }

  getReadiness() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
