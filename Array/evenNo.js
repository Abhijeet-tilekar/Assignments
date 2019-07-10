function evenNo(){
    var input = Array.from(document.getElementById("input").value.toString());
    for(let j=0;j< input.length;j++){
       if(input[j] % 2==0 && input[j+1]%2==0){
       input[j] = input[j]+"-";
       //console.log(input[j])
       }
    }
    output = input.join("");
    document.getElementById("output").innerHTML = output;
 }