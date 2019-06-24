var standard_input = process.stdin
console.log("Enter command ")
standard_input.on('data',function (data){
    if(data == 'exit')
    {
        process.exit()
    }
    var input = data.toString()
    var cnt = [] 
    for(var i=0;i<10;i++)
    {
        cnt[i] = 0
    }
    //console.log(input.length)
    for(var i=0;i<input.length;i++)
    {
        switch(parseInt(input.charAt(i)))
        {
            case 0:
                cnt[0] += 1
            break;
            case 1:
                cnt[1] += 1
            break;
            case 2:
                cnt[2] += 1
            break;
            case 3:
                cnt[3] += 1
            break;
            case 4:
                cnt[4] += 1
            break;
            case 5:
                cnt[5] += 1
            break;
            case 6:
                cnt[6] += 1
            break;
            case 7:
                cnt[7] += 1
            break;
            case 8:
                cnt[8] += 1
            break;
            case 9:
                cnt[9] += 1
            break;

        }
    }

    for(var i=0;i<9;i++)
    {
        console.log(i+" = "+cnt[i])
    }

});
console.log("ssdsd")