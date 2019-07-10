const Num2Words = require('./Num2Words');

const userInputPrompt = '\r$>';
(function(){
    var standard_input = process.stdin;
    standard_input.setEncoding('utf-8');
    process.stdout.write(userInputPrompt);
    standard_input.on('data', function (data) {
        data = data.replace('\r\n', '').replace('\n', '');
        if(data === 'exit'){
            console.log("Exiting...");
            process.exit();
        }else{
            //validate
            if(!/^\d*$/.test(data)){
                console.error("Invalid Input: ", data);                
            }else{
                //var command = Num2Words();            
                console.log("Output Arabic: ", Num2Words.execute());
                //console.log("Output European: ", command.execute(data));
            }
            process.stdout.write(userInputPrompt);
        }
    });
})();