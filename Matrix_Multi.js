
var arr = [[1,2],[4,5],[7,8]]
var arr1 = [[1,2,9],[3,4,8]]
var arr_row = arr.length
var arr_col = arr[0].length
var arr1_row = arr1.length
var arr1_col = arr1[0].length
var arr2  = []
<<<<<<< HEAD
//fgfgfgfgffgf
=======
//dfdfdfdfdfdggfgfgfgfgf
>>>>>>> b8e20bb7d35f1f1a6ecf8a0efacf5159fa6f678a
//console.log("Enter Array Dimenssion")
for( var i=0;i < arr_row;i++)
{
    arr2.push([0])       
    for(var j=0;j<arr_row;j++)
    {
        arr2[i][j] = 0
    }
}

if(arr_col == arr1_row)
{
    for(var i=0; i  < arr_row ;i++)
    {
   
        for( var j=0 ; j < arr_row ;j++)
        {
                  
            for(var k=0;k< arr_col;k++)
            {
                console.log("i "+i+" j "+j+" k "+k)
                arr2[i][j] += arr[i][k] * arr1[k][j]
            }
        }
    }
    for(var i=0,len=arr.length;i < len;i++)
    {
        var tmp = ""
        for(var j=0,len1=arr[i].length;j< len1;j++)
        {
         tmp = tmp + " " + arr[i][j]
        }
        console.log(tmp)
    
    }
    for(var i=0,len=arr1.length;i < len;i++)
    {
        var tmp = ""
        for(var j=0,len1=arr1[i].length;j< len1;j++)
        {
         tmp = tmp + " " + arr1[i][j]
        }
        console.log(tmp)
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
}
else
{
    console.log("Incorrect Array Dimenssions")
}


//sadsadasdasdasdad