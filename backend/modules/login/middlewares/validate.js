const { Validator } = require("node-input-validator");
const { errorResponse } = require("../../../utils/response/response.handler");

async function validateLoginParam(req, res, next) {
  try {
    const v = new Validator(req.body, {
      email: "required|email",
      password: "required",
    });

    const isValid = await v.check();
    if (!isValid)
      return errorResponse({
        req,
        res,
        message: "validation error",
        data: v.errors,
        code: 422,
      });

    return next();
  } catch (err) {
    return errorResponse({
      req,
      res,
      message: "validation error",
      data: err.message,
    });
  }
}

module.exports = {
  validateLoginParam,
};
