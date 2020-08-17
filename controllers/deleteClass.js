const classModel = require('../models/classes')

exports.delete = function(req, res, next) {
    classModel.find({}, function(err, results) {
        if (err) console.log(err)
        
        classModel.findByIdAndDelete(results[req.body.toDelete]._id, function(err) {
            if (err) console.log(err)
        })
    })
    res.send('ok')
}