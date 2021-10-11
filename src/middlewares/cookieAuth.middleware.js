const jwt = require('jsonwebtoken');

const clerkOnly = async (req, res, next) => {
  const { libraryToken } = req.cookies;
  if (!libraryToken) return res.status(401).json({ message: 'unauthorized request', err: 'no cookie found' });

  try {
    const { role } = jwt.verify(libraryToken, process.env.JWT_SECRET);

    if (role !== 'clerk') return res.status(403).json({ message: 'unauthorized request', err: 'only clerk can perform this action' });

    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'something went wrong in the server, try again later please.', err: error.message });
  }
};

const adminOnly = async (req, res, next) => {
  const { libraryToken } = req.cookies;
  if (!libraryToken) return res.status(401).json({ message: 'unauthorized request', err: 'no cookie found' });

  try {
    const { role } = jwt.verify(libraryToken, process.env.JWT_SECRET);

    if (role !== 'admin') return res.status(403).json({ message: 'unauthorized request', err: 'only admin can perform this action' });

    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'something went wrong in the server, try again later please.', err: error.message });
  }
};

module.exports = { clerkOnly, adminOnly };
