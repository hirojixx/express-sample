import { AuthController } from '@controllers/auth.controller';
import { IndexController } from '@controllers/index.controller';
import { UsersController } from '@controllers/users.controller';

import App from '@/app';
console.log('test')
try {
  const app = new App([AuthController, IndexController, UsersController]);
  app.listen();
} catch (error) {
  console.log(error)
}
