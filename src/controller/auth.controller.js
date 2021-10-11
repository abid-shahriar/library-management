const { PrismaClient } = require('@prisma/client');
const lodash = require('lodash');

const { cookieOptions } = require('../utils/cookie');
const { generateToken } = require('../utils/jwt');

const prisma = new PrismaClient();

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'email and password are required', error: 'missing required field' });
  }

  try {
    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) return res.status(400).json({ message: 'invalid credentials', error: 'email or password is invalid' });

    const passwordMatched = user.password === password;

    if (!passwordMatched) return res.status(400).json({ message: 'invalid credentials', error: 'email or password is invalid' });

    const token = generateToken({ email, role: user.role });

    res.cookie('libraryToken', token, cookieOptions).json({ message: 'login success', user: lodash.omit(user, ['password']) });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'something went wrong', error: error.message });
  }
};

module.exports = { login };
