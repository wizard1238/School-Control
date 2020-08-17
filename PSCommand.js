const Shell = require('node-powershell')

exports.invoke = function(cmd) {
    const ps = new Shell({
        executionPolicy: 'Bypass',
        noProfile: true
    });
    
    ps.addCommand(cmd);
    ps.invoke()
    .then(output => {
        console.log(output);
    })
    .catch(err => {
        console.log(err);
    });
}