import express from "express";
import { Project } from "./project-model.js";

const router = express.Router();
const BASE_PATH = "/api/projects";

router
  .route(BASE_PATH)
  // find all
  .get((req, res, next) => {
    Project.find()
      .lean()
      .then((projects) => res.send(projects))
      .catch(next);
  })
  // create new
  .post((req, res, next) => {
    Project.create(req.body)
      .then((project) => res.send(project))
      .catch(next);
  });

router
  .route(`${BASE_PATH}/search`)
  // search
  .post((req, res, next) => {
    Project.find(req.body)
      .lean()
      .then((projects) => res.send(projects))
      .catch(next);
  });

router
  .route(`${BASE_PATH}/:id`)
  // get one
  .get((req, res, next) => {
    Project.findById(req.params.id)
      .lean()
      .orFail()
      .then((project) => res.send(project))
      .catch(next);
  })
  // update
  .put((req, res, next) => {
    Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .lean()
      .orFail()
      .then((project) => res.send(project))
      .catch(next);
  })
  // delete
  .delete((req, res, next) => {
    Project.findByIdAndDelete(req.params.id)
      .lean()
      .orFail()
      .then(() => res.send(req.params))
      .catch(next);
  });
  
export default router;
