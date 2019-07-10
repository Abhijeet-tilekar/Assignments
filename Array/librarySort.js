var library = [ 
    { author: 'Bill Gates', title: 'The Road Ahead', libraryID: 1254},
    { author: 'Steve Jobs', title: 'Walter Isaacson', libraryID: 4264},
    { author: 'Suzanne Collins', title: 'Mockingjay: The Final Book of The Hunger Games', libraryID: 3245}
    ];

console.log("Before Sort : ")
 for(i of library){
     console.log(i);
 }
 var tmp = library.sort(function(a,b){
    var tmp1 = a.title.toLowerCase()
    var tmp2 = b.title.toLowerCase()
    if(tmp1 > tmp2){return 1}
    if(tmp1 < tmp2){return -1}
    return 0
 });
 
 console.log("After Before Sort by title  : ")
 
 for(i of tmp){
    console.log(i);
}