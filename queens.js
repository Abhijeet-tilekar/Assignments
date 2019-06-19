var n = 8
var arr = []
cnt =0 


function getRndInteger(min,max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
for( var i=0;i < n;i++)
{
    arr.push([0])       
    for(var j=0;j< n;j++)
    {
        arr[i][j] = 0
    }
}

arr[getRndInteger(0,n-1)][getRndInteger(0,n-1)] = 1

function print(arr) {
    for (var i = 0, len = arr.length; i < len; i++) {
        var tmp = ""
        for (var j = 0, len1 = arr[i].length; j < len1; j++) {
            tmp = tmp + " " + arr[i][j]
        }
        console.log(tmp)
    }
    return { i, j }
}
print(arr)

function vert(arr,i,j)
{
    var tmp = 0
    for(var h=0;h<n;h++)
    {
        tmp = tmp + arr[h][j]  
    }
    return tmp
}

function hori(arr,i,j)
{
    var tmp = 0
    for(var h =0;h<n;h++)
    {
        tmp = tmp + arr[i][h]
    }
    return tmp
}

function digo(arr,x,y)
{
   var i = x
   var j = y

    var len = arr.length
    var tmp = 0
    if(i < j)
    {
        j = Math.abs(i-j)
        i =0
        while(i<=len && j<=len)
        {
            tmp = tmp + arr[i][j] 
            i += 1
            j += 1
        }
    }
    else
    {
        i = Math.abs(i-j)
        j =0
        while(i<len && j<len)
        {
            tmp = tmp + arr[i][j] 
            i += 1
            j += 1
        }
    }
    j = x + y
    i = (x+j) - len
    while((i+j)==(x+y) && j >= 0)
    {
        tmp = tmp + arr[i][j]
        i += 1
        j -= 1
    }
    
    return tmp
}


for(var i=0;i<n;i++)
{
    for(var j=0;j<n;j++)
    {
        if(hori(arr,i,j) == 0 && vert(arr,i,j)==0)
        {
            
            if(digo(arr,i,j)==0)
            {
                cnt += 1
               
                arr[i][j] = 1
                console.log("\n")
                print(arr)
                
            }
        }
    }
}
console.log("Solutions : "+cnt)


