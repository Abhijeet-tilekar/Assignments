

/*
var data = '';

// Create a readable stream
var readerStream = FS.createReadStream('./dict.txt');

// Set the encoding to be utf8. 
readerStream.setEncoding('UTF8');

// Handle stream events --> data, end, and error
readerStream.on('data', function(chunk) {
   data += chunk;
});

readerStream.on('end',function() {
   console.log(data);
});

readerStream.on('error', function(err) {
   console.log(err.stack);
});

console.log("Program Ended");
*/
var tmp = list_fromFile().keys()
for(let i of tmp){
    console.log(i)
}