var mongoose = require('mongoose')
var Schema = mongoose.Schema

var classSchema = new Schema({
    name: String,
    code: String,
    pwd: String,
    teacher: String,
    url: String,
    myMittyURL: String,
    canvasURL: String,
    calendarURL: String,
})

module.exports = mongoose.model('classModel', classSchema)