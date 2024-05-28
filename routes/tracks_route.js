const express = require('express');
const router = express.Router();
const { insertTrack, getTrack, deleteTracks,editTrack } = require("../controllers/track_controller");
router.post("/insertTracks", insertTrack);
router.get("/getTracks", getTrack);
router.get("/editTracks", editTrack);
router.get("/deleteTracks", deleteTracks);
module.exports = router;