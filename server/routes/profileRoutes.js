const express = require('express');
const router = express.Router();

const {
  getUser,
  getAllUsers,
  createAnnounce,
  getAnnouncements,
  activateAccount,
  deactivate,
  sendFeedBack,
  getFeedBacks
} = require('../controllers/profileController');



const {
  setRead
} = require('../controllers/notificationController')
//Importing the JWT verifyer from auth middleware 


router.get('/', getAllUsers);
router.get('/:id',getUser);
router.get('/:id/getFeedBacks', getFeedBacks);
router.get('/:id/getAnnouncements', getAnnouncements);
router.post('/:id/setRead', setRead);
router.post('/:id/deactivate', deactivate);
router.post('/:id/activateAccount', activateAccount);
router.post('/:id/createAnnouncements', createAnnounce);
router.post('/:id/sendFeedBack', sendFeedBack);

module.exports = router;