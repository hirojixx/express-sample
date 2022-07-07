import App from "./app";
import { HealthCheckController } from "./controllers/HealthCheck.controller";
import { UsersController } from "./controllers/user/users.controller";

export const app = new App([HealthCheckController, UsersController]);
try {
  app.listen();
} catch (error) {
  console.log(error);
}
