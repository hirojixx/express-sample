import { Controller, Get } from 'routing-controllers';

@Controller()
export class HealthCheckController {
  @Get('/')
  healthCheck() {
    return 'OK';
  }
}
