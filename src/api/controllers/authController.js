const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../domain/models/User');

module.exports = {

  async register(req, res) {

    const { name, email, password } = req.body;

    const userExists = await User.findOne({
      where: { email }
    });

    if (userExists) {
      return res.status(400).json({
        error: 'USUARIO_JA_EXISTE'
      });
    }

    const passwordHash = await bcrypt.hash(password, 8);

    const user = await User.create({
      name,
      email,
      password: passwordHash
    });

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email
    });
  },

  async login(req, res) {

    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({
        error: 'USUARIO_INVALIDO'
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        error: 'SENHA_INVALIDA'
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d'
      }
    );

    return res.json({
      token
    });
  }

};