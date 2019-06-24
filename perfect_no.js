var input = process.stdin
console.log("Enter N value :" )
input.on('data',function (data)
{
    if(data == 'exit')
    {
        process.exit()
    }
    var input_i = parseInt(data)
    for(var i=1;i<=input_i;i++)
    {
        var tmp =0
        for(var j=0;j<=(i/2);j++)
        {
            if(i % j == 0)
            {
                tmp = tmp + j
            }
        }
        if(tmp == i)
        {
            console.log(i+" is perfect")
        }
    }
})