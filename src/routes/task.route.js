const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken')
const {
   createTask,
   getAllTasks,
   getTaskById,
   updateTask,
   deleteTask,
  } = require("../controllers/taskControllers");

  router
  .route("/")
  .get(verifyToken,getAllTasks)
  .post(verifyToken, createTask)
router
  .route("/:id")
  .get(verifyToken,getTaskById)
  .patch(verifyToken, updateTask)
  .delete(verifyToken, deleteTask);


module.exports = router;
