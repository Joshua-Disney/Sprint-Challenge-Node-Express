const express = require("express");

const Actions = require("../data/helpers/actionModel.js");

const router = express.Router();

// Get all actions
router.get("/", async (req, res) => {
  try {
    const actions = await Actions.get();
    res.status(200).json(actions);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error recieving the actions"
    });
  }
});

// Get action by id
router.get("/:id", async (req, res) => {
  try {
    const action = await Actions.get(req.params.id);
    if (action) {
      res.status(200).json(action);
    } else {
      res.status(404).json({
        message: "The action with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error recieving the action"
    });
  }
});

// Create new action
router.post("/", async (req, res) => {
  if (!req.body.notes || !req.body.description || !req.body.project_id) {
    return res.status(422).json({
      message: "notes, description, and project id required"
    });
  }
  try {
    const action = await Actions.insert(req.body);
    res.status(201).json({
      ...action,
      message: "Action successfully saved to the database"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "There was an error while saving the action to the database"
    });
  }
});

// Update an existing action
router.put("/:id", async (req, res) => {
  try {
    const action = await Actions.update(req.params.id, req.body);
    if (action) {
      res.status(200).json({
        ...action,
        message: "Action successfully updated"
      });
    } else {
      res.status(404).json({
        message: "The action with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error updating the action"
    });
  }
});

// Delete a action
router.delete("/:id", async (req, res) => {
  try {
    const count = await Actions.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({
        message: "The action has been removed"
      });
    } else {
      res.status(404).json({
        message: "The action with the specified ID does not exist."
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error removing the action"
    });
  }
});

module.exports = router;
