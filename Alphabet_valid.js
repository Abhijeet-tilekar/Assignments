var input = process.stdin
console.log("Enter Alphabet")
input.on('data',function(data){
    if(data == 'exit')
    {
        process.exit()
    }
    console.log(data.length)
    if(data.length-3 > 0)
    {
        console.log("Enter 1 Char Only !!! ")
        process.exit()
    }
    else
    {
        var f =0 
        var input1 = data.toString()
        //console.log(input1)
        switch(input1.charAt(0).toLowerCase())
        {
            case "a":
            case 'b':
            case 'c':
            case 'd':
            case 'e':
            case 'f':
            case 'g':
            case 'h':
            case 'i':
            case 'j':
            case 'k':
            case 'l':
            case 'm':
            case 'n':
            case 'o':
            case 'p':
            case 'q':
            case 'r':
            case 's':
            case 't':
            case 'u':
            case 'v':
            case 'w':
            case 'x':
            case 'y':
            case 'z':
                console.log("Alphabet")
                f = 1
            break;
        }
        if(f==0)
        {
            console.log("Not Alphabet")
        }
    }
})