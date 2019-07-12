const FS = require('fs');
const RL = require('readline-sync');


var dict_r = JSON.parse(FS.readFileSync("./CrossWord/Dict.json"));
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

function add_nodes(tree,limit,charMap){
    if(tree.lvl > limit-1){
        return 0;
    }
    else{
        add_siblings(tree,charMap);
        for(let i=0;i<tree.childs.length;i++){
            add_nodes(tree.childs[i],limit,charMap);     
        }
    }
}

function add_siblings(tree,charMap){
    if(charMap.has(tree.lvl)){
        tree.childs.push(new node(tree,charMap.get(tree.lvl),tree.lvl+1))
        tree.nc +=1;
    }
    else{
        var ch = 'a';
        for(let i=0;i<26;i++){
            tree.childs.push(new node(tree,String.fromCharCode('a'.charCodeAt(0)+ i),tree.lvl+1)) // push into childs[]
            tree.nc +=1;
        }
    }    
}

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

function tree_size(tree){
    if(tree.nc > 0){
       return tree_size(tree.childs[0])
    }
    return tree.lvl
}

function lastLevelNodes(tree){
    if(tree.nc == 0 || tree.lvl == tree_size(tree)){
        return tree
    }
    else{
        var tmp = []
        for(let i in tree.childs){
            tmp.push(lastLevelNodes(tree.childs[i]));
        }
        return tmp
    }
}

function wordsFromTree(nodes){
    var out = []
    var out_arr = []
    for(let i=0;i<nodes.length;i++){
        out.push(nodes[i].data);
        var tmp = nodes[i].parent
        while(tmp != null){
            out.push(tmp.data);
            tmp = tmp.parent;
        }
        out_arr.push(out);
        out = []
    }
    return out_arr
}

function flat_arr(arr1) {           
    return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(flat_arr(val)) : acc.concat(val), []);
 }

function suggestion(root,suggestion_arr){
    var tmp1 = lastLevelNodes(root)
    var arr = wordsFromTree(flat_arr(tmp1))
    for(let i=0;i<arr.length;i++){
        if(dict_db.has(arr[i].toString().split(',').reverse().join("").toUpperCase())){
            suggestion_arr.push(arr[i].toString().split(',').reverse().join(""));
        }
    }
    return suggestion_arr
}

function constLetters(line){
    var out = new Map();                
    for(let i=1;i<line.length;i++){
        if(line[i] >= 'a' && line[i] <= 'z'){
            out.set(i,line[i]);
        }
    }
    return out;
}

function Main(line){
    var tmp_line = line.replace(' ','_');
    console.log("suggestions for Crossword Line : "+tmp_line+"\n");
    var charMap = constLetters(line);
    suggestion_arr = [];
    if(line[0] == ' '){
        for(let i=0;i<26;i++){
            var nod = new tree(null,String.fromCharCode('a'.charCodeAt(0)+i),1)
            add_nodes(nod.root,line.length,charMap);
            suggestion(nod.root,suggestion_arr);
        }
    }
    else{
        var nod = new tree(null,line[0],1);
        add_nodes(nod.root,line.length,charMap);
        suggestion(nod.root,suggestion_arr);
        if(RL.question("Print Tree ? (Y/N)\n") == ('y'||'Y')){
            console.log("\n");
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
        console.log(out);
        console.log("Total Suggestions : "+suggestion_arr.length);
    }
}

function driverFunction(){
    console.clear();
    console.log("\t\t: CrossWord Solver :");
    console.log("(Enter /e to exit)");
    console.log("** Enter Blank character with Space **\n")
    var input =RL.question("Enter Crossword Quiz Word : \n",{keepWhitespace:true, limit:/[a-zA-Z\s]/}).toLowerCase();
    if(input == '/e'){
        process.exit();
    }
    if(/\s/.test(input)==0){
        console.log("suggestions for Crossword Line : "+input+"\n");
        console.log("Suggestions : \n "+input);
        RL.keyInPause();
        return 0;
        console.clear();
    }
    if(/[a-zA-Z]/.test(input)){
        Main(input);
        RL.keyInPause();
        console.clear();
    }
    else{
        console.log("Enter Characters only  !! ");
        RL.keyInPause();
        console.clear();
        driverFunction();
    }
}
while(1){
    driverFunction();
}
    