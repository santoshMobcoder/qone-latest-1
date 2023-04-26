const baseUrl = "/login";
const { login } = require("../controllers/login.controller");
const { validateLoginParam } = require("../middlewares/validate");

module.exports = (router) => {
  router.post(baseUrl, validateLoginParam, login);
};
