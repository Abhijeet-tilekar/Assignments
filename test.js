const FS = require('fs');
//var writerStream = FS.createWriteStream('./tmp.txt');


//Create Dictionary from JSON to Map
var tmp = JSON.parse(FS.readFileSync("./dict.json"));
const dict_db = new Map();
for (let k of Object.keys(tmp)) {
    dict_db.set(k, tmp[k]);
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

//Adding nodes
function add_node(tmp,data,limit,siblings,char,lvl){
    if(tmp.lvl > limit-1){
        return 0
    }
    else{
        add_siblings(tmp,siblings,char,lvl);
        for(let i=0;i<tmp.childs.length;i++){
        add_node(tmp.childs[i],tmp.lvl+"."+data,limit,siblings,char,lvl)      // Add more childs 
        }
    }
}

//Add 26 node chars or single char on same lvl

function add_siblings(tree,no,char,lvl){
   // let p = 0;
    if(char != '' && tree.lvl == lvl){
        tree.childs.push(new node(tree,/*tree.lvl+*/char,tree.lvl+1)) // push into childs[]
        tree.nc +=1;
    }
    else{
        var ch = 'a';
        for(let i=0;i<no;i++){
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
    var tmp1 = s_last_nodes(tmp.root)
    var arr = leaf_to_words(flat_arr(tmp1))
    var sugg = []
    for(let i=0;i<arr.length;i++){                              //Wirting words to file
            if(dict_db.has(arr[i].toString().split(',').reverse().join(""))){
            sugg.push(arr[i].toString().split(',').reverse().join(""));
        }
        //writerStream.write(arr[i].toString().split(',').reverse().join("")+"\n",'UTF8');
    }
return sugg
}


var tmp = new tree(null,"t",0)
add_node(tmp.root,"",3,26,"",3);
//print(tmp.root)
console.log(sugesstion(tmp.root));







/*
To do :
    Taking 4x4 corssword matrix
    Finding hori or vert line for sugesstion
    Mapping Line to Tree
    Suggestions 

        
    
*/