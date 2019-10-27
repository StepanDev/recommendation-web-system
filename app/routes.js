/**
 * General routing
 */

const express = require('express');

const router = express.Router();

/**
 * Routing for /edition requests
 */

router.get('/',(req,res)=>res.send('OK'));

module.exports = router;