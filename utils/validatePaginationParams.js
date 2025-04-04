// This function validates pagination parameters for a request.
exports.validatePaginationParams = (page = 1, limit = 10) => {
  const pageNumber = Math.max(1, parseInt(page, 10) || 1);
  const limitNumber = Math.min(100, parseInt(limit, 10) || 10);

  return { pageNumber, limitNumber };
};
