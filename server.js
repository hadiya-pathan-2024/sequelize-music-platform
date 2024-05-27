const express = require('express');
const { config } = require('dotenv');
const router = require('./routes/index_route');
const path = require("path");
// Load environment variables from .env file
config({ path: `.env` });

const app = express();

/**
 * Basic Configuration
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs')
app.engine('ejs', require('ejs').__express);
app.use(express.static(path.join(__dirname, "public")));
/**
 * Routes Configuration
 */
app.use('/', router);

/**
 * Spinning up server
 */
const PORT = 3000;
app.listen(PORT, () => {
    console.log('=================================');
    console.log(`🚀 App listening on the port ${PORT}`);
    console.log('=================================');
});
