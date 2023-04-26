// setup all routes
const experess = require("express");

const router = experess.Router();

require("../modules/login/routes/login.routes")(router);
require("../modules/user/routes/user.routes")(router);

module.exports = router;
