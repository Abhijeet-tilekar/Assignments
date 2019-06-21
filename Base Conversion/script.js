 
function valid(input,base) {
    var basesym = "0123456789abcdefghijklmnopqrstuvwxyz";
    if (base <= 10) {
        var reg = new RegExp("^[" + basesym.charAt(0) + "-" + basesym.charAt(Math.abs(base - 1)) + "]*$");
    }
    else {
        var reg = new RegExp("^[" + basesym.charAt(0) + "-" + basesym.charAt(Math.abs(9)) + basesym.charAt(10) + "-" + basesym.charAt(base - 1) + "]*$");
    }
    return reg.test(input);
}

function toDec(input,sbase) {
    var tmp = 0;
    for (var i = input.length - 1; i >= 0; i--) {
        var t;
        if (input.charAt(i) >= 0 && input.charAt(i) <= 9) {
            t = parseInt(input.charAt(i));
        }
        //console.log(i+" "+input.charAt(i)+" "+(input.length-1-i)+" tmp "+tmp)
        else {
            t = 9 + (input.charCodeAt(i) % 96);
            //console.log(t)
        }
        tmp = tmp + (t * (Math.pow(sbase, (input.length - 1 - i))));
        //console.log(tmp)
    }
    return tmp
}

function toDest(input,base) {
    var basesym = "0123456789abcdefghijklmnopqrstuvwxyz";
    var obasesym = basesym.slice(0, base);
    var tmp = parseInt(input);
    var out = "";
    var rem = 0;
    if(base == 1)
    {
        for(var i=0;i<input;i++)
        {
            out = out + obasesym.charAt(base-1)
        }
    }
    else
    {  
        do {
            rem = tmp % base;
            tmp = parseInt(tmp / base);
            if (rem > 9) {
                out = out + obasesym.charAt(rem);
            }
            else {
                out = out + rem;
            }
            console.log("que : "+tmp+" rem"+rem)
        } while (tmp > 0);
    }
    return out.split("").reverse().join("");
}

function myFun()
{
    var sbase = document.getElementById("sbase").value
    var dbase = document.getElementById("dbase").value
    var input = document.getElementById("input").value.toLowerCase()
    //var input = tmp.toString().toLower()    
    //alert(dbase)
    
    document.getElementById("demo").innerHTML = dbase ;
    if(valid(input,sbase)== true)
    {
        document.getElementById("demo").innerHTML = "sdsd"
        var out = toDest(toDec(input,sbase),dbase)
        document.getElementById("demo").innerHTML = "Output ("+out+")"+dbase.sub()
    }
    else
    {
        document.getElementById("demo").innerHTML = "dsdsdfgfg"
        document.getElementById("demo").innerHTML = "Incorrect Input for Given Source Base"
    }
}