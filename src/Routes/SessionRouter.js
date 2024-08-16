const express = require('express');
const sessionController = require('../Controllers/SessionController');
const router = express.Router();

router.post('/session', sessionController.createSession);
router.get('/session/:sessionId', sessionController.getSessionById);
router.put('/session/:sessionId', sessionController.updateSession);
router.delete('/session/:sessionId', sessionController.deleteSession);
router.get('/class/:classId/session', sessionController.getSessionsByClassId);

module.exports = router;
