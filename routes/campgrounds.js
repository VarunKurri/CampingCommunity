const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, authorizeUser, validateCampground } = require('../middleware');
const campgrounds = require('../controllers/campgrounds');
const multer  = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, authorizeUser, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(authorizeUser, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, authorizeUser, catchAsync(campgrounds.renderEditForm));

module.exports = router;