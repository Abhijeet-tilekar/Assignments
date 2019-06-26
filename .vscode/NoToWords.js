var symdb = { 0:"zero",1:"one",2:"two",3:"three",4:"four",5:"five",6:"six",7:"seven",8:"eight",
              9:"nine",10:"ten",11:"eleven",12:"twelve",13:"thirteen",14:"fourteen",15:"fifteen",16:"sixteen",
              17:"seventeen",18:"eighteen",19:"nineteen",20:"twenty",30:"thirty",40:"fourty",50:"fifty",60:"sixty",
              70:"seventy",80:"eighty",90:"ninety","00":"hundred","000":"thousand","00000":"lac","0000":"thousand","0000000":"crore"}
var p_in = process.stdin
p_in.setEncoding('utf-8')
console.log("Enter Number : ")

/*p_in.on("data",function(data)
{
    
    var out = ""
    var input = data.toString().slice(0,data.length-2)
    console.log(input)
    var x = input.length
    if(input>9)
    {
        while(x > 0)
        {
            var tmp =  toWord(input.slice(Math.max(x-9,0),x).toString())
            if(x<input.length)
            {
                out =  tmp+ " crore " + out
                
            }
            else
            {
                out =tmp + out
            }
            x = Math.max(x - 9,0)
            console.log(out)
        }
    }
    //console.log("in :"+input+"word :"+toWord(input))
}) */
function uniq(input,x) {            //check for uniq.pos < len
    var y = parseInt(input[x] + input[x + 1]);
    if(y>9 && y<20)
    {
        return {sym: symdb[y],pos: x+1}
        
    }
    else
    {
        y = parseInt(input[x]+"0")
        if(input[x+1]==0)
        {
            return {sym: symdb[y],pos: x+1}
        }
        return {sym: symdb[y],pos: x}

    }
}

function add_word(pos)
{
    let tmp = 0

    if(pos == 3 || pos == 4)
    {
        tmp = pos
    }
    else
    {
        tmp = pos - (pos%2)
    }
    return symdb[("0".repeat(tmp-1).toString())]
}


function toWord(input)
{
    var out = ""
    for(var i=0;i<input.length;i++)
    {   
        var cnt1 = ""
        var pos = input.length - i 
            if(pos < 9 && (pos%4==0 || pos%3 == 0))
            {
                cnt1 = add_word(pos)
            }
            else
            {
                cnt1 =""
            }
        
        if(input[i]==0)   // digits are 0's
        {
            var f = 0
            var cnt = 0
            var tmp =""
            for(var j=i;j<input.length;j++)
            {
                if(input[j]!=0)
                {
                    f =1     
                }
                cnt += 1
                tmp = tmp+"0"
            }
            if(f == 0)
            {
                if(tmp.length > 3 && tmp.length % 2 == 0) // ex 40,000 or 40,00,000
                {
                    tmp = tmp.slice(0,tmp.length - 1)

                }
                if(out =="") //if all 0
                {
                    out = symdb[0]
                    i = input.length
                }
                else
                {
                
                    out = out +" "+ symdb[tmp]
                    i = input.length 
                    
                }
                return out
            }
        
        }
        else if(pos==2 || pos > 3 && pos%2 ==1)
        { 
            out = out +" "+ uniq(input,i).sym.toString() +" "+cnt1
            i = uniq(input,i).pos
            if(i > input.length-1)
            {
                break;
            } 
        }
        else
        {
            if(i<input.length)
            {
                out = out +" "+ symdb[parseInt(input[i])] + " "+cnt1
            }
            else
            {
                out = out +" "+ symdb[parseInt(input[i])] 
            }
        }
        
        //console.log(i+" "+pos+" "+input[i]+" out: "+out)
    }
    return out
}

console.log(toWord("2300000"))
//validation
//test cases 





// to Change numbers in out to hundred,thousand,lakh
// till crore and loop
//console.log(input)
//console.log(toWord("76543234"))












