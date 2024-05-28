const express = require('express');
const router = express.Router();
const { insertPlaylist, getPlaylist, deletePlaylist,editPlaylist } = require("../controllers/playlist_controller");
router.post("/insertPlaylist", insertPlaylist);
router.get("/getPlaylist", getPlaylist);
router.get("/update/:id", editPlaylist);
router.get("/delete/:id", deletePlaylist);
module.exports = router;