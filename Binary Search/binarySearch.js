let RL = require("readline-sync");
let bin_search =(arr,val) =>{
    let start = 0;
    let stop = arr.length -1;
    let mid = Math.floor((start+stop)/2);
    console.log("Sorted Array \n"+arr+"\n");
    while(arr[mid] != val &&  start < stop){
        if(arr[mid] > val){
            stop = mid -1
        }
        else{
            start = mid + 1;
        }
        mid = Math.floor((start+stop)/2)
    }
    return (arr[mid] != val)? "Not Found" : val+" Found At position:"+(mid+1);
}
(function (){
    console.log("Binary Sort : \n",bin_search(RL.question("Enter Numbers(, separated ) : \n").split(",").sort((a, b) => a - b),RL.question("Enter Value to Search :\n")));
})();
