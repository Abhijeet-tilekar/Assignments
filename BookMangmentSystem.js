const FS = require('fs');
const RL = require('readline-sync');
const path = './books/';
var books = list_create();

class b_node{                           // Node = Line of Book
    constructor(line)
    {
        this.line = line;
        this.next = null;
    }
}
class book{                             //LL as Book
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
                    //console.log(curr.line);
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
                    //console.log(curr.line);
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

function writeToFile(name,line,f){              //Write LL to .book File
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

function create(name){                          //Create empty .book file
    if(exist(name)==true){
        console.log("Book Already Exists ! ")
        return 0
    }
    FS.writeFileSync(path+name+".book","",{flag:'w'})
    books.set(name,"");
    list_toFile(books);
    books = list_create();
    console.log("Empty Book Created !!")
}

function fromFile(name){                    // .book to LL
    var tmp_book = new book(name);
    if(FS.existsSync(path+name+".book")==true){
        var tmp = FS.readFileSync(path+name+".book",{encoding:'utf-8'}).split('\n')
        for(let i=0;i<tmp.length;i++){
            if(i==0 && tmp[0].length == 0){
                continue;
            }
            tmp[i] =tmp[i].replace(/\r?\n|\r|'/g, "");
            tmp_book.append_line(tmp[i]);
        }
        return tmp_book;
    }
    else{
        console.log("Book Not Found !! ");
        return 0;
    }
    
}

function del(name){                             //Delete book
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

function b_read(name){                          //Imoprt and read book
    console.log("Book : "+name+"\n");
    var tmp = fromFile(name);
    if(tmp != 0){
        tmp.read();
    }
    else{
        console.log("Book is Empty ")
        return 0
    }
}
function b_append(name){                        // import append and export book
    var tmp_book = fromFile(name);
    var ln = tmp_book.size;
    console.log("Type '/e' to Stop writing ")
    while(1){
        ln++;
        var tmp = RL.question("["+ln+"]: ").toString();
        if(tmp == '/e'){
            tmp_book.store();
            break;
        }
        if(tmp_book.size == 0){
            tmp_book.append_line(tmp);
            tmp_book.store();
            continue;
        }
        if(tmp.length>0){
            tmp_book.append_line(tmp);
        }
    }
}
function b_insert(name,index,line){             //import insert line at index and export
    var tmp_book = fromFile(name);
    tmp_book.insertAt(line,index);
    tmp_book.store();
}

function b_del(name,index){                     //import delete line at index and export
    var tmp_book = fromFile(name);
    tmp_book.del_line(index);
    tmp_book.store();
}


//Map list functions 
function list_create(){                         // Create map from .book files in dir and store it in list file
    var books= new Map();
    var list = FS.readdirSync(path).toString().match(/[a-zA-Z0-9\s_\.]+.book\b/g);
    //console.log(list)
    for(var i in list)
    {
        books.set(list[i].toString().slice(0,list[i].length-5),0);
    }
    list_toFile(books);
    return books;
}


function list_fromFile(){                       //import list file from dir 
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
    FS.writeFileSync(path+"books.list",tmp,{flag :'w'});
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
    console.log("\n \t\t\t : Menu : \n");
    console.log("1.List Books \t\t 2.Read Book \t\t 3.Create Book"); 
    console.log("4.Delete Book \t\t 5.Append Line \t\t 6.Insert Line ");
    console.log("7.Delete Line  \t\t 8.Search Book \t\t 9.Exit ");
    var ch = RL.question("\nEnter Choice : \n");
    var name;
    switch(parseInt(ch)){
        case 1:
            console.clear();
            list_print();
            RL.keyInPause();
            console.clear();
            menu();
            break;
        case 2:
            console.clear();
            name = RL.question("Enter Book Name to Read (without extention) :\n");
            if(exist(name)==true){
            b_read(name);
            }
            else{
                console.log("Book Not Found !!");
            }
            RL.keyInPause();
            console.clear();
            menu();
            break;
        case 3:
            console.clear();
            name = RL.question("Enter Book name to create (without extention)  : \n");
            create(name);
            RL.keyInPause();
            console.clear();
            menu();
            break;
        case 4:
            console.clear()
            del(RL.question("Enter Book name to Delete : \n"));
            RL.keyInPause();
            console.clear();
            menu();
            break;
        case 5:
            console.clear();
            name = RL.question("Enter Book name for writing to : \n");
            if(exist(name)==true){
            b_append(name);
            }
            else{
            console.log("Book Not Found !!");
            }
            RL.keyInPause();
            console.clear();
            menu();
            break;
        case 6:
            console.clear();
            name = RL.question("Enter Book name for Inserting line to : \n");
            if(exist(name)==true){
            b_read(name);
            b_insert(name,RL.question("Enter Line no to Insert to : \n"),RL.question("Enter Line to Insert : \n"));
            }
            else{
            console.log("Book not Found !!")
            }
            RL.keyInPause();
            console.clear();
            menu();
            break;
        case 7:
            console.clear();
            name = RL.question("Enter Book name for deleting line from : \n");
            if(exist(name)==true){
            b_read(name);
            b_del(name,RL.question("Enter line no to delete : \n"));
            }
            else{
                console.log("Book Not Found !!");                
            }
            RL.keyInPause();
            console.clear();
            menu();
            break;
        case 8:
            console.clear();
            list_search(RL.question("Enter book name to Search : \n"));
            RL.keyInPause();
            console.clear();
            menu();
            break;    
        case 9:
            return 0;
            break;
        default:
            console.clear();
            console.log("Enter Correct Choice!! ")
            menu();
    }
}


menu();

