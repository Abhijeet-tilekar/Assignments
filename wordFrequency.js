const RL = require('readline-sync');
const db = new Map();

console.clear();
function menu(){
        var tmp = RL.question("Enter Line :\n");
        if(tmp.toString() == '/exit'){
            return 0;
        }
        var input  = tmp.toString().toLowerCase().replace(/\.|\,|\'|\"|\?|\\|\-|\=|\+|\<|\>|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\s/g," ").replace(/\s+/g," ").split(" ");
    for(let i in input){
        if(db.has(input[i])){
            db.set(input[i],parseInt(db.get(input[i])+1));
        }
        else{
            db.set(input[i],1);
        }
    }
    search(tmp);
}


function search(line){
    var word = RL.question("Enter Word to check frequency of : \n");
    if(word.toString()=='/menu' || word.toString() == '/exit'){
        console.clear();
        menu();
    }
    else{
        if(db.has(word.toString().toLowerCase())){
            console.log("Frequency of "+word+" : "+db.get(word));
            search(line);
        }
        console.log("Word Not Found");
        search();
    }
}
console.log("Type /exit to exit & Type  /menu for menu \n\n");
menu();

