const FS = require('fs');
const RL = require('readline-sync');

//Create Dictionary from JSON to Map
var dict_r = JSON.parse(FS.readFileSync("./dict.json"));
const dict_db = new Map();
for (let k of Object.keys(dict_r)) {
    dict_db.set(k, dict_r[k]);
}

class node{
    constructor(parent,data,lvl){
        this.data = data;
        this.lvl = lvl;
        this.parent = parent;
        this.childs = [];
        this.nc = 0;
        
    }
}

class tree{
    constructor(parent,data,lvl){
        var Node = new node(parent,data,lvl);
        this.root = Node;
    }
}

//Adding nodes  (root tree,limit[length of word],char[if in word],[lvl on which char])
function add_node(tree,limit,charMap){
    if(tree.lvl > limit-1){
        return 0;
    }
    else{
        add_siblings(tree,charMap);
        for(let i=0;i<tree.childs.length;i++){
            add_node(tree.childs[i],limit,charMap);      // Add more childs 
        }
    }
}

//Add 26 node chars or single char on same lvl
function add_siblings(tree,charMap){
    if(charMap.has(tree.lvl)){
        tree.childs.push(new node(tree,charMap.get(tree.lvl),tree.lvl+1)) // push into childs[]
        tree.nc +=1;
    }
    else{
        var ch = 'a';
        for(let i=0;i<26;i++){
            tree.childs.push(new node(tree,String.fromCharCode('a'.charCodeAt(0)+ i),tree.lvl+1)) // push into childs[]
            //p++;
            tree.nc +=1;
        }
    }    
}

//Printing Tree
function print(tree){
    if(tree.nc > 0){
        console.log(" │ ".repeat(tree.lvl)+" ├──"+tree.data);
        print_c(tree);
    }
    else{
        console.log(" │ ".repeat(tree.lvl)+" ├──"+tree.data);
    }
}
function print_c(tree){
    if(tree.nc == 0){
        console.log(" │ ".repeat(tree.lvl)+" ├──"+tree.data)
    }
    else{
        for(let i=0;i<tree.nc;i++){
            print(tree.childs[i]);
        }
    }
}  

//Tree size 
function tree_size(tree){
    if(tree.nc > 0){
       return tree_size(tree.childs[0])
    }
    return tree.lvl
}

//get all nodes from size - 1 cause IDK XD
function  s_last_nodes(tree){
    if(tree.nc == 0 || tree.lvl == tree_size(tree)){
        return tree
    }
    else{
        var tmp = []
        for(let i in tree.childs){
            tmp.push(s_last_nodes(tree.childs[i]));
        }
        return tmp
    }
}

//get word by combining char form  leaf to root
function leaf_to_words(nodes){
    var out = []
    var out_arr = []
    for(let i=0;i<nodes.length;i++){
        out.push(nodes[i].data);
        //out = out + nodes[i];
        var tmp = nodes[i].parent
        while(tmp != null){
            //out = out + tmp;
            out.push(tmp.data);
            tmp = tmp.parent;
        }
        out_arr.push(out);
        out = []
    }
    return out_arr
}

function flat_arr(arr1) {                       //Un-nest array 
    return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(flat_arr(val)) : acc.concat(val), []);
 }

//Print Suggestions
function suggestion(root,suggestion_arr){
    var tmp1 = s_last_nodes(root)
    var arr = leaf_to_words(flat_arr(tmp1))
    for(let i=0;i<arr.length;i++){
        if(dict_db.has(arr[i].toString().split(',').reverse().join(""))){
            suggestion_arr.push(arr[i].toString().split(',').reverse().join(""));
        }
    }
    return suggestion_arr
}

//Line to map of between characters
function bet_letters(line){
    var out = new Map();                 //when line != 0000
    for(let i=1;i<line.length;i++){
        if(line[i] >= 'a' && line[i] <= 'z'){
            out.set(i,line[i]);
        }
    }
    return out;
}


//Main Function
function Main(line){
    var tmp_line = line.replace(' ','_');
    console.log("suggestions for Crossword Line : "+tmp_line+"\n");
    var charMap = bet_letters(line);
    suggestion_arr = [];
    if(line[0] == ' '){
        for(let i=0;i<26;i++){
            var nod = new tree(null,String.fromCharCode('a'.charCodeAt(0)+i),1)
            add_node(nod.root,line.length,charMap);
            suggestion(nod.root,suggestion_arr);
        }
    }
    else{
        var nod = new tree(null,line[0],1);
        add_node(nod.root,line.length,charMap);
        suggestion(nod.root,suggestion_arr);
        if(RL.question("Print Tree ? (Y/N)") == ('y'||'Y')){
            print(nod.root);
        }
          
    }
    print_suggestions(suggestion_arr);
}


function print_suggestions(suggestion_arr) {
    if (suggestion_arr.length == 1) {
        console.log("0 Suggestions !!");
    }
    else {
        console.log("Suggestions : \n");
        let out  = "";
        for(let i=1;i<=suggestion_arr.length;i++){
            out = out + suggestion_arr[i-1] +"\t\t"
            if(i % 8 == 0){
                console.log(out);
                out ="";
            }
        }
        console.log("Total Suggestions : "+suggestion_arr.length);
    }
}

function driver(){
    console.clear();
    console.log("\t\t: CrossWord Solver :");
    console.log("(Enter /e to exit) \n\n");
    var input =RL.question("Enter Crossword Quiz Word (blank with spaces) : \n",{keepWhitespace:true}).toLowerCase();
    if(input == '/e'){
        process.exit();
    }
    if(/[a-zA-Z\s]/.test(input)){
        Main(input);
        RL.keyInPause();
        console.clear();
    }
    else{
        console.log("Enter Characters only  !! ");
        RL.keyInPause();
        console.clear();
        driver();
    }
}

while(1){
driver();
}

/*
To do :
    Dict word dict for cross word
    Print tree 
    Print no word found if no word found  **
    print suggestions in good design **
    Show input word before suggestions **
    print no of suggestions **
     

    Validation of input :
        No numbers allowed
        lower case input
        

    Testing :
        check perfomance for differnet length of inputs 

    Optimization :
        Better style for code
        Optimize performance
        
*/