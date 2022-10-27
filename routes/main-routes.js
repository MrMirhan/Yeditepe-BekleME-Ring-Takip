const express = require('express');
const {
    mainPage,
    savePage
} = require('../controllers/mainController');


const router = express.Router();

router.get('/', mainPage);
router.post('/saveData', savePage);

module.exports = {
    routes: router
}