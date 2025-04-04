// Error handling middleware
exports.handleError = (res, error, message = "") => {
  res.status(500).json({
    status: "error",
    message,
    error: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
};
