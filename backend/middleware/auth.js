import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    const authToken = req.cookies.authToken;
    if (!authToken) {
      return res.status(401).json({
        Success: false,
        message: "Authentication Required",
        data: null,
      });
    }

    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(error.status).json({
      Success: false,
      message: error.message,
      data: null,
    });
  }
};

export const adminAuth = async (req, res, next) => {
  try {
    const authToken = req.cookies.authToken;

    if (!authToken) {
      return res.status(401).json({
        Success: false,
        message: "Authentication Required",
        data: null,
      });
    }

    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);

    const role = decoded.role;

    if (role !== "admin") {
        return res.status(401).json({
            Success: false,
            message: "Admin access required",
            data: null
        })
    }

    req.user = decoded;
    next();

  } catch (error) {
    res.status(error.status).json({
        Success: false,
        message: error.message,
        data: null
    })
  }
};
