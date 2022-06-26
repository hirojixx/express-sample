import App from "./app";
import { HealthCheckController } from "./controllers/healthCheck.controller";
import { UsersController } from "./controllers/user/users.controller";


try {
  const app = new App([HealthCheckController, UsersController]);
  app.listen();
} catch (error) {
  console.log(error);
}
