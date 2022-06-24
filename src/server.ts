import { IndexController } from '@controllers/index.controller';
import { UsersController } from '@controllers/users.controller';

import App from '@/app';

try {
  const app = new App([IndexController, UsersController]);
  app.listen();
} catch (error) {
  console.log(error)
}
