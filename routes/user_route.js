const express = require('express');
const router = express.Router();
const { register, insertUser,getUsers, editUser } = require('../controllers/user_controller');
router.get("/", register)
router.post('/insertUser', insertUser);
router.get('/getUsers', getUsers)
router.get("/update/:id", editUser)
// router.get('/user-posts', getUserPosts);
module.exports = router;
