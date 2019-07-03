
import module;
//const Fs = require('fs')
/*function toJSON(proto) {
    let jsoned = {};
    let toConvert = proto || this;
    Object.getOwnPropertyNames(toConvert).forEach((prop) => {
        const val = toConvert[prop];
        // don't include those
        if (prop === 'toJSON' || prop === 'constructor') {
            return;
        }
        if (typeof val === 'function') {
            jsoned[prop] = val.bind(jsoned);
            return;
        }
        jsoned[prop] = val;
    });

    const inherited = Object.getPrototypeOf(toConvert);
    if (inherited !== null) {
        Object.keys(this.toJSON(inherited)).forEach(key => {
            if (!!jsoned[key] || key === 'constructor' || key === 'toJSON')
                return;
            if (typeof inherited[key] === 'function') {
                jsoned[key] = inherited[key].bind(jsoned);
                return;
            }
            jsoned[key] = inherited[key];
        });
    }
    return jsoned;
}

function writeToFile (data, path) {  
  const json = JSON.stringify(data, null, 2)

  Fs.writeFile(path, json, (err) => {
    if (err) {
      console.error(err)
      throw err
    }

    console.log('Saved data to file.')
  })
}


writeToFile(ll,'./text1')
readFromFile('./text1')
function readFromFile (path) {  
  Fs.readFile(path, 'utf8', (err, json) => {
    if (err) {
      console.error(err)
      throw err
    }
    
    const data = JSON.parse(json)
    console.log(data)
  })
}








class Node { 
    // constructor 
    constructor(element) 
    { 
        this.element = element; 
        this.next = null
    } 
} 


// linkedlist class 
class LinkedList { 
    constructor() 
    { 
        this.head = null; 
        this.size = 0; 
    } 
    
    // functions to be implemented 
    // add(element) 
    add(element) 
{ 
    // creates a new node 
    var node = new Node(element); 
  
    // to store current node 
    var current; 
  
    // if list is Empty add the 
    // element and make it head 
    if (this.head == null) 
        this.head = node; 
    else { 
        current = this.head; 
  
        // iterate to the end of the 
        // list 
        while (current.next) { 
            current = current.next; 
        } 
  
        // add node 
        current.next = node; 
    } 
    this.size++; 
} 
    // insertAt(element, location) 
    // insert element at the position index 
// of the list 
insertAt(element, index) 
{ 
    if (index > 0 && index > this.size) 
        return false; 
    else { 
        // creates a new node 
        var node = new Node(element); 
        var curr, prev; 
  
        curr = this.head; 
  
        // add the element to the 
        // first index 
        if (index == 0) { 
            node.next = head; 
            this.head = node; 
        } else { 
            curr = this.head; 
            var it = 0; 
  
            // iterate over the list to find 
            // the position to insert 
            while (it < index) { 
                it++; 
                prev = curr; 
                curr = curr.next; 
            } 
  
            // adding an element 
            node.next = curr; 
            prev.next = node; 
        } 
        this.size++; 
    } 
} 
    // removeFrom(location) 
    removeFrom(index) 
{ 
    if (index > 0 && index > this.size) 
        return -1; 
    else { 
        var curr, prev, it = 0; 
        curr = this.head; 
        prev = curr; 
  
        // deleting first element 
        if (index == 0) { 
            this.head = curr.next; 
        } else { 
            // iterate over the list to the 
            // position to removce an element 
            while (it < index) { 
                it++; 
                prev = curr; 
                curr = curr.next; 
            } 
  
            // remove the element 
            prev.next = curr.next; 
        } 
        this.size--; 
  
        // return the remove element 
        return curr.element; 
    } 
} 
    // removeElement(element) 
    /*
    removeElement(element) 
{ 
    var current = this.head; 
    var prev = null; 
  
    // iterate over the list 
    while (current != null) { 
        // comparing element with current 
        // element if found then remove the 
        // and return true 
        if (current.element === element) { 
            if (prev == null) { 
                this.head = current.next; 
            } else { 
                prev.next = current.next; 
            } 
            this.size--; 
            return current.element; 
        } 
        prev = current; 
        current = current.next; 
    } 
    return -1; 
} 
indexOf(element) 
{ 
    var count = 0; 
    var current = this.head; 
  
    // iterae over the list 
    while (current != null) { 
        // compare each element of the list 
        // with given element 
        if (current.element === element) 
            return count; 
        count++; 
        current = current.next; 
    } 
  
    // not found 
    return -1; 
}
isEmpty() 
{ 
    return this.size == 0; 
} 
size_of_list() 
{ 
    console.log(this.size); 
}
printList() 
{ 
    var curr = this.head; 
    var str = ""; 
    while (curr) { 
        str += curr.element + " "; 
        curr = curr.next; 
    } 
    console.log(str); 
} 
  
    // Helper Methods 
    // isEmpty 
    // size_Of_List 
    // PrintList 
} 

// creating an object for the 
// Linkedlist class 
var ll = new LinkedList(); 
  
// testing isEmpty on an empty list 
// returns true 
console.log(ll.isEmpty()); 
  
// adding element to the list 
ll.add(10); 
  
// prints 10 
ll.printList(); 
  
// returns 1 
console.log(ll.size_of_list()); 
  
// adding more elements to the list 
ll.add(20); 
ll.add(30); 
ll.add(40); 
ll.add(50); 
  
// returns 10 20 30 40 50 
ll.printList(); 
  
// prints 50 from the list 
console.log("is element removed ?" + ll.removeElement(50)); 
  
// prints 10 20 30 40 
ll.printList(); 
  
// returns 3 
console.log("Index of 40 " + ll.indexOf(40)); 
  
// insert 60 at second position 
// ll contains 10 20 60 30 40 
ll.insertAt(60, 2); 
  
ll.printList(); 
  
// returns false 
console.log("is List Empty ? " + ll.isEmpty()); 
  
// remove 3rd element from the list 
console.log(ll.removeFrom(3)); 
console.log(Array.from(ll))
// prints 10 20 60 40 
ll.printList(); 

*/
/*

function test(name)
{
    var tmp = new LL(name)
    return tmp
}
console.log(Fs.existsSync("./tmp.txt"))

//Fs.writeFileSync('./tmp.txt',"\nHello",{encoding:'utf-8',flag:'as+'})
//Fs.writeFileSync('./tmp.txt',"\nHello1",{encoding:'utf-8',flag:'as+'})
var tmp = Fs.readFileSync('./tmp.txt',{encoding : 'utf-8'})
//tmp = tmp.split('\n')
//console.log(tmp[2])
*/
var xd= "hgfds"
function test1(asd)
{
    console.log(asd);
}
class test{
    constructor()
    {
        this.name = 'test';
    }
    print()
    {
        console.log(this.name)
    }
    sum(a,b)
    {
        console.log(a+b)
    }
}
module.exports = test;