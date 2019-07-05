const FS = require('fs');
const RL = require('readline-sync');
const path = './books/';
var books = list_create();

class b_node{
    constructor(line)
    {
        this.line = line;
        this.next = null;
    }
}
class book{
    constructor(name){
        this.name = name;
        this.head = null;
        this.last = this.head;
        this.size = 0;
    }
    append_line(line){
        var node = new b_node(line);
        if(this.head == null){
            this.head = node;
            this.last = node;
        }
        else
        {
        this.last.next = node;
        this.last = node;
        }
        this.size++;
    }
    insertAt(line,index)
    {
        if(index < 1 || index > this.size)      //Line verification Error
        {
            console.log("Line not found !! ");
            return -1;
        }
        else
        {
            index--;
            var node = new b_node(line);
            var pre,curr;
            curr = this.head;
            if(index == 0) // insert at start
            {
                node.next = this.head;
                this.head = node;
            }
            else            //insert at index
            {
                curr = this.head;
                var i =0;
                while(i<index)
                {
                    i++;
                    console.log(curr.line);
                    pre = curr;
                    curr = curr.next;
                }
                node.next = curr;
                pre.next = node;
            }
            this.size++;
            
        }
    }
    del_line(index){
        
        if(index < 1 || index > this.size){
            console.log("Line not Found !! ");
            return -1;
        }
        else{
            index--;
            var curr,prev;
            curr =this.head;
            if((index)== 0){
                this.head = curr.next;
            }
            else{
                let i =0;
                while(i < index){
                    console.log(curr.line);
                    i++;
                    prev = curr;
                    curr = curr.next;
                }
                prev.next = curr.next;
                
            }
            this.size--;
        }
    }
    store(){
        var curr = this.head;

        if(exist(this.name)==true){
            var i='w';    
            while(curr){
                writeToFile(this.name,curr.line,i)
                i = 'as+';
                curr = curr.next;
            }
        }
        else{
            console.log("Book does not exits !!");
        }
        
    }
    
    read(){
        var curr = this.head;
        var i =1;
        if(FS.statSync(path+this.name+".book").size == 0){
            return 0;
        }
        else{
            while(curr){
                console.log("["+i+"] "+curr.line);
                curr = curr.next;i++;
            }
        }
    }
}

function writeToFile(name,line,f){
    if(exist(name) == true){
        if(f == 'w'){
            FS.writeFileSync(path+name+".book",line,{encoding:'utf-8',flag:f})    
        }
        else{
            FS.writeFileSync(path+name+".book","\n"+line,{encoding:'utf-8',flag:f})
        }
    }
    else{
        return 1
    }  
}

function create(name){
    if(exist(name)==true){
        console.log("File Already Exists ! ")
        return 0
    }
    FS.writeFileSync(path+name+".book","",{flag:'w'})
    books.set(name,"");
    list_toFile(books);
    books = list_create();
    console.log("Empty Book Created !!")
}

function fromFile(name){
    var tmp_book = new book(name);
    if(FS.existsSync(path+name+".book")==true){
        var tmp = FS.readFileSync(path+name+".book",{encoding:'utf-8'}).split('\n')
        for(let i in tmp){
            tmp[i] =tmp[i].replace(/\r?\n|\r|'/g, "");
            tmp_book.append_line(tmp[i]);
        }
        return tmp_book;
    }
    else{
        console.log("Book Not Found !! ");
        return -1;
    }
    
}

function del(name){
    if(exist(name)==false){
        console.log("Book Already Deleted !!");
        return 0;
    }
    FS.unlinkSync(path+name+".book");
    books.delete(name);
    list_toFile(books);
    book = list_create();
    console.log("Book Deleted !");
}

function b_read(name){
    console.log("Book : "+name+"\n");
    var tmp = fromFile(name);
    if(tmp != 0){
        tmp.read();
    }
}
function b_append(name){
    var tmp_book = fromFile(name);
    var ln = tmp_book.size ;
    console.log("Type '/exit' to Stop writing ")
    while(1){
        var tmp = RL.question("["+ln+"]: ").toString();
        ln++;
        if(tmp == '/exit'){
            tmp_book.store();
            break;
        }
        if(tmp.length>0){
            tmp_book.append_line(tmp);
        }
    }
    //tmp_book.store();
}
function b_insert(name,index,line){
    var tmp_book = fromFile(name);
    tmp_book.insertAt(line,index);
    tmp_book.store();
}

function b_del(name,index){
    var tmp_book = fromFile(name);
    tmp_book.del_line(index);
    tmp_book.store();
}


//Map list functions 
function list_create(){
    var books= new Map();
    var list = FS.readdirSync(path).toString().match(/[a-zA-Z0-1]+.book/g);
    for(var i in list)
    {
        books.set(list[i].slice(0,list[i].length-5),"");
    }
    list_toFile(books);
    return books;
}


function list_fromFile(){
    var tmp = JSON.parse(FS.readFileSync(path+"books.list"));
    let list = new Map();
    for (let k of Object.keys(tmp)) {
        list.set(k, tmp[k]);
    }
    return list;
}


function list_toFile(list){
    let obj = Object.create(null);
    for (let [k,v] of list) {
        obj[k] = v;
    }
    var tmp = JSON.stringify(obj);  
    FS.writeFileSync("./books/books.list",tmp,{flag :'w'});
}

function list_print(){
    var tmp = list_create();
    var get_keys = tmp.keys();
    console.log("Book List : \n");
    var j =1;
    for(let i of get_keys){
        console.log("["+j+"] "+i);
        j++;
    }
    list_toFile(tmp);
}

function exist(name){
    var tmp = list_create();
    list_toFile(tmp);
    return tmp.has(name)
}

function list_search(name){
    if(exist(name)==false){
        console.log("Book Not Found !!");
        return -1
    }
    console.log("Book Found !!");
    b_read(name);
}

function menu(){
    books = list_create();
    console.log("\n \t\t\t Menu : \n");
    console.log("1.List Books \t\t 2.Read Book \t\t 3.Create Book"); 
    console.log("4.Delete Book \t\t 5.Append Line \t\t 6.Insert Line ");
    console.log("7.Delete Line  \t\t 8.Search Book \t\t 9.Exit ");
    var ch = RL.question("\nEnter Choice : \n");
    var name;
    switch(parseInt(ch)){
        case 1:
            list_print();
            menu();
            break;
        case 2:
            b_read(RL.question("Enter Book Name to Read :\n"));
            menu();
            break;
        case 3:
            create(RL.question("Enter Book name to create  : \n"));
            menu();
            break;
        case 4:
            del(RL.question("Enter Book name to Delete : \n"));
            menu();
            break;
        case 5:
            name = RL.question("Enter Book name for writing to : \n");
            b_read(name);
            b_append(name);
            menu();
            break;
        case 6:
            name = RL.question("Enter Book name for Inserting line to : \n");
            b_read(name);
            b_insert(name,RL.question("Enter Line no to Insert to : \n"),RL.question("Enter Line to Insert : \n"));
            menu();
            break;
        case 7:
            name = RL.question("Enter Book name for deleting line from : \n");
            b_read(name);

            b_del(name,RL.question("Enter line no to delete : \n"));
            menu();
            break;
        case 8:
                list_search(RL.question("Enter book name to Search : \n"));
                menu();
                break;    
        case 9:
            return 0;
            break;
        default:
            console.log("Enter Correct Choice : ")
            menu();
    }
}


menu();


/*

Map for exits or not 
create map for name : name/something
map => json => json file
imoprt at start 
reaplce exits with checking in map;


DONE :
    Formatting 
    Wrong input 
    loop in menu
    printing book 
    errors 
    */