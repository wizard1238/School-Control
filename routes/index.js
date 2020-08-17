var express = require('express');
var router = express.Router();

const addClass = require('../controllers/addClasses')
const displayClass = require('../controllers/displayClasses')
const deleteClass = require('../controllers/deleteClass')
const editClass = require('../controllers/editClass')

const recordClass = require('../controllers/recordClass')

const mongoose = require('mongoose')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/url', function(req, res, next) {
  res.render('getMeeting')
})

/* Class functions */
router.get('/addClass', addClass.add)
router.post('/addClass', addClass.process)
router.get('/displayClasses', displayClass.show)
router.get('/api/displayClasses', displayClass.data)
router.post('/editClassPage', editClass.editPage)
router.post('/editClass', editClass.edit)
router.post('/api/deleteClass', deleteClass.delete)

/* Zoom and OBS functions */
router.get('/recording', recordClass.show)
router.post('/record', recordClass.record)
router.get('/stopRecording', recordClass.stop)

module.exports = router;