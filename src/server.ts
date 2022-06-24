import { AuthController } from '@controllers/auth.controller';
import { IndexController } from '@controllers/index.controller';
import { UsersController } from '@controllers/users.controller';
import validateEnv from '@utils/validateEnv';

import App from '@/app';

validateEnv();

const app = new App([AuthController, IndexController, UsersController]);
app.listen();
