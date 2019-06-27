
var symdb = { 0:"Zero",1:"One",2:"Two",3:"Three",4:"Four",5:"Five",6:"Six",7:"Seven",8:"Eight",
9:"Nine",10:"Ten",11:"Eleven",12:"Twelve",13:"Thirteen",14:"Fourteen",15:"Fifteen",16:"Sixteen",
17:"Seventeen",18:"Eighteen",19:"Nineteen",20:"Twenty",30:"Thirty",40:"Fourty",50:"Fifty",60:"Sixty",
70:"Seventy",80:"Eighty",90:"Ninety"}
var ss_db  = {0:" ",1:"Thousand ",2:"Million",3:"Billion",2:"Million",3:"Billion",4:"Trillion",5:"Quadrillion",6:"Quintillion",7:"Sextillion",8:"Septillion",9:"Octillion",10:"Nonillion",11:"Decillion",12:"Undecillion",13:"Duodecillion",14:"Tredecillion",15:"Quattuordecillion",16:"Quindecillion",17:"Sexdecillion",18:"Septendecillion",19:"Octodecillion",20:"Novemdecillion",21:"Vigintillion",22:"Centillion"}
var out = ""
var p_in = process.stdin
p_in.setEncoding('utf-8')

console.log("Enter Number : ")

p_in.on("data",function(data)
{
    var out = ""
    var input = data.toString().slice(0,data.length-2)
    var arr = []
    if(input == 0)
    {
        console.log("Zero")
    }
    if(input.length>3)          //Split into group of 3
    {
        var x = input.length
        while(x > 0)
        {
            arr.push(input.slice(Math.max(x-3,0),x).toString())             
            x = Math.max(x-3,0)
        }
        arr = arr.reverse()
       
    }
    else
    {
        arr.push(input)
    }
    console.log(arr)
    for(let i=0;i<arr.length;i++)
    {
        if(arr[i] != 0 )
        {   
            out = out + digit_3(arr[i].toString())+" "+ss_db[arr.length-i-1]+ " "
        }
    }
    console.log("In Words  :"+out.split('  ').join(' '))   
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
function digit_3(input)                 //conver 3 digit
{
    var out = ""
    for(let i =0;i<input.length;i++)
    {
        var pos = input.length - i
        if(input[i] == 0)
        {
            continue
        }
        if(pos==2)  // To check for 11-19/20,30,40....90
        { 
            if(uniq(input,i).pos == 1)
            {
                //cnt1 = add_word(pos)
                out = out +" "+ uniq(input,i).sym.toString() 
                i= i + 1   
            }
            else                        // for 0-9
            {
                out = out +" "+ uniq(input,i).sym.toString()
        
            }
            if(i > input.length-1)
            {
                break;
            } 
        }
        else if(pos==3)
        {
            out = symdb[input[i]] + " Hundred"+out
        }
        else
        {
            out = out + " "+ symdb[input[i]]
        }

    }
    return out      
}

