const express = require('express');
const router = express.Router();
const { insertArtist, getArtists, deleteArtist, editArtist } = require('../controllers/artist_controller');
router.post("/insertArtist", insertArtist);
router.get("/getArtist", getArtists);
router.get("/editArtist", editArtist);
router.get("/deleteArtist", deleteArtist);
module.exports = router;