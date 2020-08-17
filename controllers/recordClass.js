const OBSWebSocket = require('obs-websocket-js')
const obs = new OBSWebSocket()
obs.connect({address: 'localhost:4444'})

const fs = require('fs')

const recordingModel = require('../models/recording')
const classModel = require('../models/classes')
const PSCommand = require("../PSCommand")

exports.show = function(req, res, next) {
    recordingModel.find({}, function(err, result) {
        if (err) console.log(err)

        if (result.length == 0) {
            res.render('recording', {
                recording: 'No',
                currentClass: 'N/A',
            })
        } else {
            res.render('recording', {
                recording: result[0].recording,
                currentClass: result[0].class,
            })
        }
    })
}

exports.record = function(req, res, next) {
    classModel.find({}, function(err, results) {
        if (err) console.log(err)
        
        recordingModel.find({}, function(err, result) {
            if (err) console.log(err)
    
            if (result.length == 0) {
                var record = new recordingModel({
                    recording: 'Yes',
                    class: results[req.body.classNumber].name
                })
                record.save()
            } else if (result[0].recording == 'Yes') {
                
            } else {
                PSCommand.invoke(`C:\\Users\\jeremy.tow\\AppData\\Roaming\\Zoom\\bin\\Zoom.exe "--url=zoommtg://zoom.us/join?action=join&confno=${results[req.body.classNumber].code}&pwd=${results[req.body.classNumber].pwd}"`)
                obs.send('StartRecording')
                result[0].recording = 'Yes'
                result[0].class = results[req.body.classNumber].name
                result[0].save()
            }
        })
    })
    .then( () => res.redirect('/recording'))
}

exports.stop = function(req, res, next) {
    PSCommand.invoke('Stop-Process -Name Zoom')
    obs.send('StopRecording')
    recordingModel.find({}, function(err, result) {
        if (err) console.log(err)

        result[0].lastRecorded = result[0].class
        result[0].recording = 'No'
        result[0].class = 'N/A'
        result[0].save()
    })
    .then( () => res.redirect('/recording'))
}

fs.watch('Z:\\Class Recordings\\Ingest', function(event, trigger) {
    recordingModel.find({}, function(err, result){
        if (result[0].lastRecorded !== 'N/A') {
            fs.rename(`Z:\\Class Recordings\\Ingest\\${trigger}`, `Z:\\Class Recordings\\${result[0].lastRecorded}\\${trigger}`, (err) => {
                if (err) {
                    console.log(err.code)
                    if (err.code == 'ENOENT') {
                        fs.mkdir(`Z:\\Class Recordings\\${result[0].lastRecorded}`, (err) => {
                            if (err) console.log(err)
                        })
                        fs.rename(`Z:\\Class Recordings\\Ingest\\${trigger}`, `Z:\\Class Recordings\\${result[0].lastRecorded}\\${trigger}`, (err) => {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log('Moved')
                            }
                        })
                    }
                } else {
                    console.log('Moved')
                }
            })
        }
    })
})