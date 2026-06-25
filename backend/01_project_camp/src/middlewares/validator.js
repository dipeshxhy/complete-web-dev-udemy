// middleware/validate.js

export const validator = (schema) => (req, res, next) => {
  const results = schema.safeParse(req.body);
  if (!results.success) {
    let errors = results.error.flatten().fieldErrors;
    errors = Object.fromEntries(
      Object.entries(errors).map(([field, messages]) => [
        field,
        messages.join(", "),
      ]),
    );

    return res.status(400).json({
      status: "fail",
      message: "Validation failed",
      errors: errors,
    });
  }
  req.body = results.data;
  next();
};
