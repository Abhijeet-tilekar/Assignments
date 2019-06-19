var n = 2
var arr2 = []




for( var i=0;i < n;i++)
{
    arr2.push([0])       
    for(var j=0;j< n;j++)
    {
        arr2[i][j] = 0
    }
}

for(var i=0,len=arr2.length;i < len;i++)
{
    var tmp = ""
   for(var j=0,len1=arr2[i].length;j< len1;j++)
   {
        tmp = tmp + " " + arr2[i][j]
   }
   console.log(tmp)    
}




var vert =0 

for( var i=0;i<n;i++)
{
    var tmp = "I: "+ i
    for(var j =0;j<n;j++)
    {
        tmp = tmp + " J:"+j
        for(var h=j;h<n;h++)
        {
            
            console.log(tmp + " queen : "+vert)
            if(arr2[i][h] != 0)
            {
                
                vert = 1
            }
        }
        
    }
}
console.log(vert)