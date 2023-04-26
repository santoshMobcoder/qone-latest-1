const { Validator } = require("node-input-validator");
const { errorResponse } = require("../../../utils/response/response.handler");

async function validateAddItemParam(req, res, next) {
  try {
    const v = new Validator(req.body, {
      items: "required|array",
      "items.*.itemName": "required|string",
      "items.*.userName": "required|string",
      "items.*.date": "required|string",
      "items.*.state": "required|string",
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

async function validateDeleteItemParam(req, res, next) {
  try {
    const v = new Validator(req.params, {
      id: "required|string",
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

async function validateUpdateItemParam(req, res, next) {
  try {
    const v = new Validator(req.body, {
      itemName: "required|string",
      state: "required|string",
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
  validateAddItemParam,
  validateDeleteItemParam,
  validateUpdateItemParam,
};
