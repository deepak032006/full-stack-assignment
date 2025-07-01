const express = require('express');
const router = express.Router();
const tenderController = require('../controllers/tenderController');

router.post('/', tenderController.createTender);
router.get('/', tenderController.getAllTenders);
router.get('/company/:companyId', tenderController.getCompanyTenders);

module.exports = router;
