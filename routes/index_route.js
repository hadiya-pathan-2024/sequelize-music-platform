const {Router} = require("express")
const userRoutes = require("./user_route")
const artistRoutes = require("./artist_route")
const playlistRoutes = require("./playlist_route")
const tracksRoutes = require("./tracks_route")
const router = Router();
router.use('/register', userRoutes);
router.use('/artist', artistRoutes);
router.use('/playlist', playlistRoutes);
router.use('/tracks', tracksRoutes);
module.exports = router;