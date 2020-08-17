const classModel = require('../models/classes')

exports.editPage = function(req, res, next) {
    classModel.find({}, function(err, results) {
        if (err) console.log(err)
        res.render('addClass', {
            title: `Edit: ${results[req.body.classNumber].name}`, 
            name: results[req.body.classNumber].name,
            code: results[req.body.classNumber].code,
            pwd: results[req.body.classNumber].pwd,
            teacher: results[req.body.classNumber].teacher,
            url: results[req.body.classNumber].url,
            myMittyURL: results[req.body.classNumber].myMittyURL,
            canvasURL: results[req.body.classNumber].canvasURL,
            calendarURL: results[req.body.classNumber].calendarURL,
            id: results[req.body.classNumber]._id,
            action: '/editClass'
        })
    })
}

exports.edit = function(req, res, next) {
    classModel.findById(req.body.id, function(err, result) {
        if (err) console.log(err)
        
        result.name = req.body.name,
        result.code = req.body.code,
        result.pwd = req.body.pwd,
        result.teacher = req.body.teacher,
        result.url = req.body.url,
        result.myMittyURL = req.body.myMittyURL,
        result.canvasURL = req.body.canvasURL,
        result.calendarURL = req.body.calendarURL,
        
        result.save()
    })
    res.redirect('/displayClasses')
}