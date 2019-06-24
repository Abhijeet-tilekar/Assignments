var input = process.stdin
input.on('data', function (data){
if(data == 'exit')
{
    process.exit()
}
var tmp = parseInt(data)
console.log("Enter No : ")
console.log(tmp)
console.log("No of digits : " + tmp.toString().length)
})
