const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: 'TOKEN_NAO_ENVIADO'
    });
  }

  const token = authHeader.split(' ')[1];

  try {

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.userId = decoded.id;

    return next();

  } catch (error) {

    return res.status(401).json({
      error: 'TOKEN_INVALIDO'
    });
  }
};