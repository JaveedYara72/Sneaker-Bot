
module.exports = {
  nodescript: function(){
    // var {PythonShell} = require( 'python-shell');
    // // let pyshell = new PythonShell('my_script.py');

    // let Number = null

    // let options = {
    //   mode: 'text',
    //   pythonPath: 'python',
    //   pythonOptions: ['-u'], // get print results in real-time
    //   scriptPath: 'C:/Users/javee/Desktop/discord bot/footlocker again/MobileModule',
    //   // args: ['value1', 'value2', 'value3']
    // };

    // let pyshell = new PythonShell('otp.py',options);
    // pyshell.send('hello from node');

    
    // pyshell.on('message', function (message) {
    //   // received a message sent from the Python script (a simple "print" statement)
    //   console.log(message)
    //   Number = message
    // });

    // pyshell.end(function (err,code,signal) {
    //   if (err) throw err;
    //   console.log('The exit code was: ' + code);
    //   console.log(`Number found -> ${Number}`)
    // });

    // -------------------
    const {spawn} = require('child_process');

    const childPython = spawn('python', ['otp.py']);

    childPython.stdout.on('data',(data) => {
      var dataa = data.toString();
      console.log(dataa)
      return dataa
    });

    childPython.stderr.on('data', (data) => {
      var dataa = data.toString();
      console.error(`Error: ${dataa}`);
    });

    childPython.on('close', (code)=> {
      console.log(`Closed with code: ${code}`);
    });


  }
}