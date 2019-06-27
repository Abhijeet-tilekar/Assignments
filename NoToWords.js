/*
    Neg No's
    for x+9 0's eg 1,00,00,00,000
    if in = string 
*/
var symdb = { 0:"Zero",1:"One",2:"Two",3:"Three",4:"Four",5:"Five",6:"Six",7:"Seven",8:"Eight",
              9:"Nine",10:"Ten",11:"Eleven",12:"Twelve",13:"Thirteen",14:"Fourteen",15:"Fifteen",16:"Sixteen",
              17:"Seventeen",18:"Eighteen",19:"Nineteen",20:"Twenty",30:"Thirty",40:"Fourty",50:"Fifty",60:"Sixty",
              70:"Seventy",80:"Eighty",90:"Ninety","00":"Hundred","000":"Thousand","00000":"Lakh","0000":"Thousand","0000000":"Crore"}
var p_in = process.stdin
p_in.setEncoding('utf-8')
console.log("Number to Words (Indian No System)")
console.log("Enter Number : ")

p_in.on("data",function(data)
{
    var out = ""
    var neg = 0
    var input = data.toString().slice(0,data.length-2)
    if(input.length != parseInt(input).length)
    {
        console.log("Enter Number only !!")
        process.exit()
    }
    if(input[0] =="-")              // if neg no 
    {
        input = input.slice(1,input.length)
        neg = 1
    }
    input = parseInt(input.replace(",","")).toString()
    
    console.log(input)
    var x = input.length
    if(input.length>9)
    {
        while(x > 0)  // To Split No into 9 digits (crore)
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
        }
    }
    else
    {
        out = toWord(input)
    }
    if(neg == 1)
    {
        out = "Negative " + out
    }
    out = out.split('  ').join(' ')
    console.log(out)
}) 
function uniq(input,x) {        // convert 11-19, 20,30... 90 to words
    var y = parseInt(input[x] + input[x + 1]);
    if((y>9 && y<20) || y % 10 ==0)
    {
        return {sym: symdb[y],pos: 1}
        
    }
    else
    {
        
        y = parseInt(input[x]+"0")
        return {sym: symdb[y],pos: 0}

    }
}

function add_word(pos) // index to Hundred/Thousand/Lakh/Crore
{
    if(pos>2)
    {
        let tmp = 0

        if(pos == 3)
        {
            tmp = 3
        }
        else
        {
            tmp = pos - (pos%2)
        }
        return symdb[("0".repeat(tmp-1).toString())] 
    }
    else
    {
        return ""
    }
}


function toWord(input)
{
    var out = ""
    for(var i=0;i<input.length;i++)
    {   
        var cnt1 = ""
        var pos = input.length - i 
        if(pos < 9 && (pos%4==0 || pos%3 == 0))    // to add 
            {
            
                cnt1 = add_word(pos)
  
            }
        else
            {
                cnt1 =""
            }
        
        if(input[i]==0)   // if digits are 0's
        {
            var f = 0
            var cnt = 0
            var tmp =""
            for(var j=i;j<input.length;j++)
            {
                if(input[j]==0)
                {
                    if(f==0)
                    {
                        cnt += 1 
                        tmp = tmp+"0"
                    }
                }
                else
                {
                f = 1 
                }
            }
            if(f == 0) // all 0 till last digit
            {
                if(tmp.length > 3 && tmp.length % 2 == 0) // ex 40,000 or 40,00,000
                {
                    tmp = tmp.slice(0,tmp.length - 1)
                }
                if(out =="") //if all 0 from first digit    
                {
                    out = symdb[0]
                    i = input.length
                }
                else
                { 
                    if(i+(cnt-1)==input.length-1)
                    {
                        return out
                    }
                    out = out +" "+ symdb[tmp]
                    i = input.length 
                    return out
                }
            }
            else        //change pos by no of 0's
            {
              i = i + (cnt -1)
                pos = input.length - i
            }
        
        }
        else if(pos==2 || pos > 3 && pos%2 ==1)  // To check for 11-19/20,30,40....90
        { 
            if(uniq(input,i).pos == 1)
            {
                cnt1 = add_word(pos)
                out = out +" "+ uniq(input,i).sym.toString() +" "+cnt1
                i= i + 1
                
            }
            else                        // for 0-9
            {
                out = out +" "+ uniq(input,i).sym.toString() +" "+cnt1
        
            }
            
            if(i > input.length-1)
            {
                break;
            } 
        }
        else
        {
            if(pos>1)
            {
                out = out +" "+ symdb[parseInt(input[i])] + " "+cnt1 // append output
        
            }
            else
            {
                out = out +" "+ symdb[parseInt(input[i])] 
            }
        }
        
    }
    
    return out
}


















