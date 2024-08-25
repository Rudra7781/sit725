const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');

router.get('/add', viewController.addNumbers);
router.get('/display', viewController.displayContent);
router.get('/about', viewController.serveAboutPage);
router.get('/home', viewController.serveHomePage);

module.exports = router;
