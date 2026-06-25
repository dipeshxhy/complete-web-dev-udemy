const sendErrorDev = (err, res) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};
const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
  // Programming or other unknown error: don't leak error details
  console.error("ERROR 💥", err);
  return res.status(500).json({
    success: false,
    message: "Something went very wrong!",
  });
};

const sendCastError = (err, res) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  res.status(400).json({
    success: false,
    message,
  });
};
// middleware/errorHandler.js
export const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    return sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    if (err.name === "CastError") {
      return sendCastError(err, res);
    }
    if (err.name === "ValidationError") {
      return res.status(422).json({
        success: false,
        message: err.message,
      });
    }
    if (err.code === 11000) {
      const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

      const field = Object.keys(err.keyValue)[0];
      return res.status(409).json({
        success: false,
        message: `Duplicate field value: ${field}-${value}. Please use another value!`,
      });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid Token . please login again!",
      });
    }
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token Expired . please login again!",
      });
    }

    return sendErrorProd(err, res);
  }
};
