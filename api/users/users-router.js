const express = require("express");
const Users = require("./users-model");
const Posts = require("../posts/posts-model");
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const { validateUserId, validateUser } = require("../middleware/middleware");
const router = express.Router();

router.get("/", async (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  try {
    const allUsers = await Users.get();
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json({ message: "cannot retrieve users" });
  }
});

router.get("/:id", validateUserId, async (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.user);
});

router.post("/", validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid

  Users.insert(req.body)
    .then((user) => res.status(201).json(user))
    .catch(() => res.status(500).json({ message: "user was not added" }));
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid

  Users.update(req.params.id, req.body)
    .then((user) => res.status(200).json(user))
    .catch(() => res.status(500).json({ message: "user was not updated" }));
});

router.delete("/:id", validateUserId, async (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  const deletedUser = await Users.getById(req.params.id);
  try {
    await Users.remove(req.params.id);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ message: "could not delete user" });
  }
});

router.get("/:id/posts", async (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post("/:id/posts", (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = { router };
