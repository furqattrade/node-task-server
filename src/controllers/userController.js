const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");
const { genPassword, issueJWT, validPassword } = require("../utils/auth");
const AppError = require("../utils/appError");

exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });
	if (!user) {
		return next(new AppError("Authentication failed", 401));
	}

	const passwordMatch = await validPassword(password, user.hash);
	if (!passwordMatch) {
		return next(new AppError("Authentication failed", 401));
	}

	const token = issueJWT(user);

	res.status(200).json({ token, user });
});
exports.register = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;
	if (!password) return next(new AppError("Password is required", 400));

	const existingUser = await User.findOne({ email });
	if (existingUser) {
		return next(new AppError("User already exists", 400));
	}
	const hash = await genPassword(password);
	const user = await User.create({
		email,
		hash,
	});
	const jwtToken = issueJWT(user);
	res.status(201).json({
		token: jwtToken,
		status: "success",
		user,
	});
});
exports.getUser = catchAsync(async (req, res, next) => {
	const { userId } = req;
	if (!userId) return next(new AppError("User not found", 401));

	const existingUser = await User.findById(userId).select("-hash");
	res.status(200).json({
		user: existingUser,
	});
});
