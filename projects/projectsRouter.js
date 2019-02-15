const express = require("express");

const Projects = require("../data/helpers/projectModel.js");

const router = express.Router();

// Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Projects.get();
    res.status(200).json(projects);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error recieving the projects"
    });
  }
});

// Get project by id
router.get("/:id", async (req, res) => {
  try {
    const project = await Projects.get(req.params.id);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({
        message: "The project with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error recieving the project"
    });
  }
});

// Get project actions
router.get("/:id/actions", async (req, res) => {
  try {
    const projectActions = await Projects.getProjectActions(req.params.id);
    if (projectActions) {
      res.status(200).json(projectActions);
    } else {
      res.status(404).json({
        message: "The project with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error recieving the project"
    });
  }
});

// Create new project
router.post("/", async (req, res) => {
  if (!req.body.name || !req.body.description) {
    return res.status(422).json({
      message: "name and description required"
    });
  }
  try {
    const project = await Projects.insert(req.body);
    res.status(201).json({
      ...project,
      message: "Project successfully saved to the database"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "There was an error while saving the project to the database"
    });
  }
});

// Update an existing project
router.put("/:id", async (req, res) => {
  if (!req.body.name || !req.body.description) {
    return res.status(422).json({
      message: "name and description required"
    });
  }
  try {
    const project = await Projects.update(req.params.id, req.body);
    if (project) {
      res.status(200).json({
        ...project,
        message: "Project successfully updated"
      });
    } else {
      res.status(404).json({
        message: "The project with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error updating the project"
    });
  }
});

// Delete a project
router.delete("/:id", async (req, res) => {
  try {
    const count = await Projects.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({
        message: "The project has been removed"
      });
    } else {
      res.status(404).json({
        message: "The project with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error removing the project"
    });
  }
});

module.exports = router;
