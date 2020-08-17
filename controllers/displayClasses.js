const classModel = require('../models/classes')

exports.show = function(req, res, next) {
    res.render("viewClasses")
}

exports.data = function(req, res, next) {
    classModel.find({}, function(err, classes) {
        if (err) console.log(err)
        res.send(classes)
    })
}