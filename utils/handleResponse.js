exports.handleResponse = (res, message, data = {}) => {
  res.status(200).json({
    status: "success",
    message,
    data,
  });
};
