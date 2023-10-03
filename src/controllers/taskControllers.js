const Task = require("../models/task.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createTask = catchAsync(async (req, res, next) => {
	const { title, description, deadline } = req.body;
	const task = new Task({ title, description, deadline, user: req.userId });
	await task.save();
	res.status(201).json(task);
});

exports.getAllTasks = catchAsync(async (req, res, next) => {
	const tasks = await Task.find({ user: req.userId }).populate("user");
	res.status(200).json(tasks);
});

exports.getTaskById = catchAsync(async (req, res, next) => {
	const taskId = req.params.id;
	const task = await Task.findById(taskId).populate("user");
	if (!task) {
		return next(new AppError("Task not found", 404));
	}
	res.status(200).json(task);
});

exports.updateTask = catchAsync(async (req, res, next) => {
	const taskId = req.params.id;
	const { title, description, deadline } = req.body;
	const updatedTask = await Task.findByIdAndUpdate(
		taskId,
		{ title, description, deadline },
		{ new: true }
	);
	if (!updatedTask) {
		return next(new AppError("Task not found", 404));
	}
	res.status(200).json(updatedTask);
});

exports.deleteTask = catchAsync(async (req, res, next) => {
	const taskId = req.params.id;
	const deletedTask = await Task.findByIdAndDelete(taskId);
	if (!deletedTask) {
		return next(new AppError("Task not found", 404));
	}
	res.status(204).send();
});
