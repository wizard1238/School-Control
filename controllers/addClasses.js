const classModel = require('../models/classes')

exports.add = function(req, res, next) {
    res.render("addClass", {title: 'Add Class:', action: '/addClass'})
}

exports.process = function(req, res, next) {

    var newClass = new classModel({
        name: req.body.name,
        code: req.body.code,
        pwd: req.body.pwd,
        teacher: req.body.teacher,
        url: req.body.url,
        myMittyURL: req.body.myMittyURL,
        canvasURL: req.body.canvasURL,
        calendarURL: req.body.calendarURL,
    })

    newClass.save()

    res.redirect('/')
}