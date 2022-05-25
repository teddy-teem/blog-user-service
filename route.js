const router = require("koa-router");
const healthController = require("./controller/healthController");
const userController = require("./controller/userController");
const routes = new router();

routes.get("/health", healthController.health);
routes.get("/private/user/:contactId", userController.getUserByContactId);
routes.post("/private/user", userController.getUserByEmail);

routes.post("/user", userController.createUser);
routes.delete("/user/:contactId", userController.deleteBlogUser);

module.exports = routes;
