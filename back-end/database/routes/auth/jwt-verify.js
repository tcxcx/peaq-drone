const jwt = require('jsonwebtoken');
const { decodeAddress, encodeAddress } = require('@polkadot/util-crypto');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const substrateAddress = encodeAddress(decodeAddress(decoded.address), 42);
    req.user = { ...decoded, substrateAddress };
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(400).json({ error: 'Invalid token.' });
  }
};
module.exports = verifyToken;
