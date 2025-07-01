const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

router.post('/', applicationController.submitApplication);
router.get('/tender/:tenderId', applicationController.getApplicationsForTender);

module.exports = router;
