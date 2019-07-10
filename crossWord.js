const FS = require('fs');
var bet_char = new Map();
//var writerStream = FS.createWriteStream('./tmp.txt');


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
function add_node(tree,limit){
    if(tree.lvl > limit-1){
        return 0;
    }
    else{
        add_siblings(tree);
        for(let i=0;i<tree.childs.length;i++){
            add_node(tree.childs[i],limit);      // Add more childs 
        }
    }
}

//Add 26 node chars or single char on same lvl

function add_siblings(tree){
   // let p = 0;
   //if(char != '' && tree.lvl == lvl){
    if(bet_char.has(tree.lvl)){
        tree.childs.push(new node(tree,/*tree.lvl+*/bet_char.get(tree.lvl),tree.lvl+1)) // push into childs[]
        tree.nc +=1;
    }
    else{
        var ch = 'a';
        for(let i=0;i<26;i++){
            tree.childs.push(new node(tree,/*"["+parseInt(tree.lvl+1)+"."+parseInt(i+1)+"."+p+"]"+*/String.fromCharCode(ch.charCodeAt(0) + i),tree.lvl+1)) // push into childs[]
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
function sugesstion(root){
    var tmp1 = s_last_nodes(root)
    var arr = leaf_to_words(flat_arr(tmp1))
    
    var sugg = []
    for(let i=0;i<arr.length;i++){
           // console.log(arr[i].toString().split(',').reverse().join(""));                              //Wirting words to file
        if(dict_db.has(arr[i].toString().split(',').reverse().join(""))){
            sugg.push(arr[i].toString().split(',').reverse().join(""));
        }
        //writerStream.write(arr[i].toString().split(',').reverse().join("")+"\n",'UTF8');
    }
return sugg
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

var tree1 = new tree(null,"t",0)




add_node(tree1.root,3); 
//print(tmp.root)
//console.log(sugesstion(tmp.root));
var sugg = sugesstion(tree1.root)
/*for(let i of sugg)
{
    console.log(i)
}*/

function print_matrix(arr){
    var rows = arr.length;
    var cols = arr[0].length;
    for(let i=0;i<rows;i++){-7
        var out = ""
        for(let j=0;j<cols;j++){
            out = out +"|" + arr[i][j];
        }
        console.log(out)
        console.log("¯¯¯¯¯¯¯¯");
    }
}


//Push Horizontal or vertical line in matrix add 1 from matrix
/*function toMatrix(line,no,f){
    if(line.length <= arr.length && line != 0){
        if(f == 'h'){
            var tmp = line.split('');
            if(line.length < arr.length){
                let i = line.length;
                while(i < arr.length){
                    tmp.push(arr[no-1][i]);
                    i++;
                }
            }
            arr[no-1] = tmp;
        }
        else{
            var tmp = line.split('');
            if(line.length < arr.length){
                let i = line.length;
                while(i < arr.length){
                    tmp.push(arr[i][no-1]);
                    i++;
                }
            }
            for(let i=0;i<arr.length;i++){
                arr[i][no-1] = tmp[i];
            }
        }
    }
}


function toLine(arr,ln,f){
        let rows = arr.length;
        let colos = arr[0].length;
        let out ="";
        let tmp = ""
        if(f == 'h'){
            out = arr[ln-1].join('') 
        }
        else{
            let i = 0;
            while(i < arr.length){
                out = out + arr[i][ln-1].toString();
                i++;
            }
        }
    return out;
}*/



/*
To do :
    Taking 4x4 corssword matrix
    Finding hori or vert line for sugesstion
    Mapping Line to Tree
    Suggestions 
    Print Matrix
    if 1st letter is blank


    Get Details from line : 
        length
        between chars 

Not Working :
        For words without starting letters 
    
*/