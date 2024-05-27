const {Router} = require("express")
const userRoutes = require("./user_route")
const router = Router();
router.use('/register', userRoutes);
module.exports = router;