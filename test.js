const FS = require('fs');
var bet_char = new Map();

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


//Driver Function
function suggestion(root){
    var tmp1 = s_last_nodes(root)
    var arr = leaf_to_words(flat_arr(tmp1))
    
    var sugg = []
    for(let i=0;i<arr.length;i++){
           // console.log(arr[i].toString().split(',').reverse().join(""));                              //Wirting words to file
        if(dict_db.has(arr[i].toString().split(',').reverse().join(""))){
            console.log(arr[i].toString().split(',').reverse().join(""));
        }
        //writerStream.write(arr[i].toString().split(',').reverse().join("")+"\n",'UTF8');
    }
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


//Function to starting with blank
function Main(line){
    var charMap = bet_letters(line);
    //var nodeArr  = [];
    if(line[0] == ' '){
        for(let i=0;i<26;i++){
            var nod = new tree(null,String.fromCharCode('a'.charCodeAt(0)+i),1)
            add_node(nod.root,line.length,charMap);
            suggestion(nod.root);
            //nodeArr.push(nod);
        }
    }
    else{
        var nod = new tree(null,line[0],1);
        add_node(nod.root,line.length,charMap);
        suggestion(nod.root)
    }
}

Main("         ");



/*
To do :
    Print tree 

    Validation of input :
        No numbers allowed
        lower case input


    Testing :
        check perfomance for differnet length of inputs 

    Optimization :
        Better style for code
        Optimize performance
        
*/