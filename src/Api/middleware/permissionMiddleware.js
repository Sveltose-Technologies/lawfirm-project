// middleware/permissionMiddleware.js

exports.checkPermission = (module, action) => {
  return (req, res, next) => {

    const permission = `${module}_${action}`;

    if (req.user.role === "super_admin") {
      return next();
    }

    if (!req.user.permissions.includes(permission)) {
      return res.status(403).json({
        message: "Access Denied",
      });
    }

    next();
  };
};