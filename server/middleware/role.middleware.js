const { error } = require('../utils/response');

const authorize = (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      return error(res, 'Forbidden. You do not have permission.', 403);
    }
    next();
  };

module.exports = { authorize };
