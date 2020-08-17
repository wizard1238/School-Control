var mongoose = require('mongoose')
var Schema = mongoose.Schema

var recordingSchema = new Schema({
    recording: String,
    class: String,
    lastRecorded: String,
})

module.exports =  mongoose.model('recordingModel', recordingSchema)