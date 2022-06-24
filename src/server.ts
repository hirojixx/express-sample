import { HealthCheckController } from '@/controllers/healthCheck.controller';
import { UsersController } from '@controllers/users.controller';

import App from '@/app';

try {
  const app = new App([HealthCheckController, UsersController]);
  app.listen();
} catch (error) {
  console.log(error)
}
