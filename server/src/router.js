import express from "express";
import tasksRouter from "./task/task-router.js";
import projectRouter from "./project/project-router.js";

const router = express.Router();
router
  .use(tasksRouter)
  .use(projectRouter)
  .use((error, req, res, next) => {
    res.status(500).send({
      code: error.code,
      message: error.message,
    });
  });

export default router;
