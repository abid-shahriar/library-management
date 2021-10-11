const cookieOptions = {
  secure: process.env.ENV !== 'dev',
  httpOnly: true,
  sameSite: process.env.ENV !== 'dev' ? 'none' : false,
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
};

module.exports = { cookieOptions };
