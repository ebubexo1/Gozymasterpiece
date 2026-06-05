// Runs AFTER protect (which sets req.user). Blocks non-admins.
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') return next();
  return res.status(403).json({ message: 'Admin access required' });
};

module.exports = admin;
