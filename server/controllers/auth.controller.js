const UserModel = require('../models/user.model');
const { hashPassword, comparePassword } = require('../utils/hash');
const { signToken } = require('../utils/jwt');
const { success, error } = require('../utils/response');

const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const existing = await UserModel.findByEmail(email);
    if (existing) return error(res, 'Email already registered', 409);

    const hashed = await hashPassword(password);
    const user = await UserModel.create({ name, email, password: hashed, phone });

    const token = signToken({ id: user.id.toString(), role: user.role });
    return success(res, { user: serializeUser(user), token }, 'Registration successful', 201);
  } catch (err) {
    return error(res, err.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findByEmail(email);
    if (!user) return error(res, 'Invalid credentials', 401);

    if (user.status === 'BLOCKED') return error(res, 'Account is blocked', 403);

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return error(res, 'Invalid credentials', 401);

    const token = signToken({ id: user.id.toString(), role: user.role });
    const { password: _, ...safeUser } = user;
    return success(res, { user: serializeUser(safeUser), token }, 'Login successful');
  } catch (err) {
    return error(res, err.message);
  }
};

const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    if (!user) return error(res, 'User not found', 404);
    return success(res, serializeUser(user));
  } catch (err) {
    return error(res, err.message);
  }
};

// BigInt cannot be JSON serialized — convert id fields to string
const serializeUser = (user) => ({
  ...user,
  id: user.id?.toString(),
});

module.exports = { register, login, getMe };
