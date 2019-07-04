const FS = require('fs');
const RL = require('readline-sync');
const path = './books/'
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
    append(line){
        var node = new b_node(line);
        if(this.head == null){
            this.head = node;
            this.last = node;
        }
        else
        {
        this.last.next = node;
        this.last = node;
        this.size++;
        }
    }
    insertAt(line,index)
    {
        if(index > 0 && index > this.size)      //Line verification Error
        {
            console.log("Line not found !! ");
            return false;
        }
        else
        {
            var node = new b_node(line);
            var pre,curr;
            curr = this.head;
            if(index == 0) // insert at start
            {
                node.next = head;
                this.head = node;
            }
            else            //insert at index
            {
                curr = this.head;
                var i =0;
                while(i<index-1)
                {
                    i++;
                    pre = curr;
                    curr = curr.next;
                }
                node.next = curr;
                pre.next = node;
            }
            this.size++;
            
        }
    }
    
    del(index){
        if(index < 0 && index > this.size){
            console.log("Line not Found !! ");
            return 0;
        }
        var i =0;
        var curr,prev;
        curr =this.head;
        while(i < index-1){
            i++;
            prev = curr;
            curr = curr.next;
        }
        prev.next = curr.next;
        this.size--;

    }
    store(){
        if(FS.existsSync(path+this.name+".book")==false){
            console.log("Book not Found !! ");
            return 0;
        }
        var curr = this.head;
        while(curr){
            Write(this.name,((curr == this.head)? '': '\n')+curr.line,(curr == this.head) ? 'w' : 'as+');
            curr = curr.next;
        }
    }
    read(){
        var curr = this.head;
        var i =1;
        while(curr){
            console.log("["+i+"] "+curr.line);
            curr = curr.next;i++;
        }
    }
}

function Write(name,line,f){

    FS.writeFileSync(path+name+".book",line,{flag : f});
}

function create(name){
    if(FS.existsSync(path+name+".book")==true){
        console.log("File Already Exists ! ")
        return 0
    }
    FS.writeFileSync(path+name+".book","",{flag:'w'})
    console.log("Empty Book Created !!")
}

function fromFile(name){
    var tmp_book = new book(name);
    FS.readFileSync(path+name+".book",{encoding:'utf-8'}).split('\n').forEach(element => {
        tmp_book.append(element);
    });
    return tmp_book;
}

function list(){

}

function b_del(name){
    if(FS.existsSync(path+name+".book")==false){
        console.log("Book Already Deleted !!");
    }
    FS.unlinkSync(path+name+".book");
    console.log("Book Deleted !");
}

function b_read(name){
    console.log("Book : "+name+"\n");
    fromFile(name).read();
}

function menu(){
    console.log("Menu : \n");
    console.log("1.List Books :");
    console.log("2.Read Book :");
    console.log("3.Create Book :");
    console.log("4.Delete Book :");
    console.log("5.Append Line to Book :");
    console.log("6.Insert Line in Book :");
    console.log("7.Delete Line from Book :");
    console.log("8.Exit :");
    var ch = RL.question("Enter Choice : \n")
    switch(parseInt(ch)){
        case 1:

            break;
        case 2:
            b_read(RL.question("Enter Book Name to Read :\n"));
            break;
        case 3:
            break;
        case 4:
            break;
        case 5:
            break;
        case 6:
            break;
        case 7:
            break;
        case 8:
            break;
    }
}

menu();
/*
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