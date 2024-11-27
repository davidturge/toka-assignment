import express from "express";
import { Task } from "./task-model.js";

const router = express.Router();
const BASE_PATH = "/api/tasks";

router
  .route(BASE_PATH)
  // find all
  .get((req, res, next) => {
    Task.find()
      .lean()
      .then((tasks) => res.send(tasks))
      .catch(next);
  })
  // create new
  .post((req, res, next) => {
    Task.create(req.body)
      .then((task) => res.send(task))
      .catch(next);
  });

router
  .route(`${BASE_PATH}/search`)
  // search
  .post((req, res, next) => {
    Task.find(req.body)
      .lean()
      .then((tasks) => res.send(tasks))
      .catch(next);
  });

router
  .route(`${BASE_PATH}/:id`)
  // get one
  .get((req, res, next) => {
    Task.findById(req.params.id)
      .lean()
      .orFail()
      .then((task) => res.send(task))
      .catch(next);
  })
  // update
  .put((req, res, next) => {
    Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .lean()
      .orFail()
      .then((task) => res.send(task))
      .catch(next);
  })
  // delete
  .delete((req, res, next) => {
    Task.findByIdAndDelete(req.params.id)
      .lean()
      .orFail()
      .then(() => res.send(req.params))
      .catch(next);
  });

export default router;
