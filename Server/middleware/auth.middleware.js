const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/constant");

const checkAuth = (role) => {
  return (req, res, next) => {
    try {
      const decoded = jwt.verify(req.headers.token, JWT_SECRET);
      req.authUser = decoded;
      console.log(decoded);
      if (role && !req.authUser.roles.includes(role)) {
        res.status(401).json({
          message: "Unauthorized",
        });
        return;
      }
      next();
    } catch (err) {
      console.log(err);
      res.status(401).json({
        message: "Unauthorized",
      });
    }
  };
}; // roles = ['customer', 'admin'].includes('suepr admin')

const checkAuthOld = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers.token, "secret");
    req.authUser = decoded;

    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};

const checkAuthAdmin = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers.token, "secret");
    req.authUser = decoded;
    if (req.authUser.roles.includes("Admin")) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};

// checkAuth('Customer'), checkAuth('SuperAdmin')

module.exports = {
  checkAuth,
};

// function test() {
//   const count = 0;
//   return () => {
//     console.log(count);
//   };
// }
