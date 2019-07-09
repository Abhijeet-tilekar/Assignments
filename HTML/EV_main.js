function validate(){
    var input = document.getElementById("in").value.toString();
    //var input = "abhijeet@gamil.c"
    if(input[0] != /[0-9]/ && input.includes("@") && input.includes(".")){
        var tmp = input.lastIndexOf(".")
        var tmp2 = input.indexOf("@");
        if((tmp+2) < input.length && input[(tmp2+1)] != "."){
            alert("Valid Email Address");
            return 0;
        }
    }
    alert("Invalid Email Address");
}
