const express = require('express');
const router = express.Router();
const User = require('../models/user')
const {
  handleCreateUser,
  handleGetAllUsers,
  handleGetUsersById,
  handleUpdateUsersById,
  handleDeleteUsersById
} = require('../controlers/user')

router
  .route('/:id')
  .get(handleGetUsersById)
  .patch(handleUpdateUsersById)
  .delete(handleDeleteUsersById)

router
  .route('/')
  .post(handleCreateUser)
  .get(handleGetAllUsers);

module.exports = router;