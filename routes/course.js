const express = require("express");
const router = express.Router();
const Course = require("../models").Course;

/**
 * @GET '/api/courses' Returns a list of courses
 */
router.get("/", (req, res) => {
  Course.findAll()
    .then(courses => {
      res.status(200);
      res.json({ courses });
    })
    .catch(err => {
      console.error(err);
    });
});

/**
 * @GET '/api/courses/:id' returns the course
 */
router.get("/:id", (req, res, next) => {
  Course.findOne({ where: { id: req.params.id } })
    .then(course => {
      if (course) {
        res.status(200);
        res.json({ course });
      } else {
        res.json({ erorr: "course not found" });
      }
    })
    .catch(err => {
      next(err);
    });
});

/**
 * @POST Creates a course
 */
router.post("/", (req, res, next) => {
  Course.findOne({ where: { title: req.body.title } })
    .then(course => {
      if (course) {
        res.json({ error: "course already exists" });
      } else {
        const newCourse = {
          title: req.body.title,
          description: req.body.description,
          estimatedTime: req.body.estimatedTime,
          materialsNeeded: req.body.materialsNeeded
        };
        Course.create(newCourse)
          .then(() => {
            res.status(201).end();
          })
          .catch(err => {
            err.status = 400;
            next(err);
          });
      }
    })
    .catch(err => {
      err.status = 400;
      next(err);
    });
});

/**
 * @PUT Updates a course
 */
router.put("/:id", (req, res) => {
  Course.findOne({ where: { id: req.params.id } })
    .then(course => {
      if (!course) {
        res.status(400);
        res.json({ error: "course not found" });
      } else {
        const updatedCourse = {
          title: req.body.title,
          description: req.body.description,
          estimatedTime: req.body.estimatedTime,
          materialsNeeded: req.body.materialsNeeded,
          userId: req.body.userId
        };
        // returns a promise
        return course.update(updatedCourse);
      }
    })
    // when done, set the status and end the request
    .then(() => {
      res.status(204).end();
    })
    .catch(err => console.error(err));
});

/**
 * @DELETE Deletes a course
 */
router.delete("/:id", (req, res) => {
  Course.findOne({ where: { id: req.params.id } })
    .then(course => {
      if (!course) {
        res.status(400);
        res.json({ error: "course no found" });
      } else {
        return course.destroy();
      }
    })
    .then(() => {
      res.status(204).end();
    })
    .catch(err => console.error(err));
});

module.exports = router;
