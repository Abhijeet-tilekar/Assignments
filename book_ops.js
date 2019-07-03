const readline = require('readline')
const path = './books/'
const Fs = require('fs')
const RL =  readline.createInterface({
    input : process.stdin,
    output : process.stdout
});


function list_books(path)
{
    console.log("dsdsdsd")
    Fs.readdir(path,(err,books)=>
    {
        if(err)
        {
            console.log(err)
            throw err
        }
        var book_l = Array.from(books)
        print(book_l)
        console.log("sdfkll")
        /*for(let i=0;i<book_l.length;i++)
        {
            console.log("["+(i+1)+"] "+book_l[i])
        }*/
    });
    sub_menu()
}



function b_append(b_name,line)        //To append line to array (book)
{
    Fs.readFile(path+b_name+".txt", 'utf8', (err, json) => {
        if (err) {
          console.error(err)
          throw err
        }
        const data = JSON.parse(json)
        var tmp = Array.from(data)
        tmp.push(line)
        var tmp1 =JSON.stringify(tmp)
        Fs.writeFile(path+b_name+".txt",tmp1,(err)=>
        {
            if(err)
            {
                console.log(err)
                throw err
            }
            console.log("Saved Data in file ")
        })
        
    })
}


function b_insert(name,line_no,input)
{
    Fs.readFile(path+name+".txt", 'utf8', (err, json) => {
        if (err) {
          console.error(err)
          throw err
        }
        const data = JSON.parse(json)
        var arr = Array.from(data)
        if(line_exist(arr,line_no)== true)
        {
            arr.splice(line_no-1,0,input)
            var tmp1 =JSON.stringify(arr)
            Fs.writeFile(path+name+".txt",tmp1,(err)=>
            {
                if(err)
                {
                    console.log(err)
                    throw err
                }
                console.log("Saved Data in file ")
            })  
        }
        else
        {
            console.log("Line not Found ")
            return 1
        }
    })
    
}


function b_del(name,line_no)
{
    Fs.readFile(path+name+".txt", 'utf8', (err, json) => 
    {
        if (err) 
        {
            console.error(err)
            throw err
        }
        const data = JSON.parse(json)
        var arr = Array.from(data)
        if(line_exist(arr,line_no)== true)
        {
            arr.splice(line_no-1,1)
            var tmp1 =JSON.stringify(arr)
            Fs.writeFile(path+name+".txt",tmp1,(err)=>
            {
                if(err)
                {
                    console.log(err)
                    throw err
                }
                console.log("Saved Data in file ")
            })  
        }
        else
        {
            return 1
        }
    });
}

function b_read(name)
{
    Fs.readFile(path+name+".txt", 'utf8', (err, json) => 
    {
        if (err) 
        {
            console.error(err)
            throw err
        }
        const data = JSON.parse(json)
        var arr = Array.from(data)
        for(let i=0;i<arr.length;i++)
        {
            console.log("["+(i+1)+"] "+arr[i].toString())
        }
    });
}


function line_exist(arr,line_no)
{
    if(line_no < arr.length && line_no > 0)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function f_create(name)
{
    Fs.closeSync(Fs.openSync(path+name+".txt",'a'))
    console.log("Book "+name+" Created successfully! ")
}
function f_write(arr,file_name,path)
{
    let json = JSON.stringify(arr)
    Fs.writeFile(path+file_name+".txt",json,(err)=>
    {
        if(err)
        {
            console.log(err)
            throw err
        }
        console.log("Saved Data in file ")
    })
}


function f_read(path)
{
    //const data = null
    Fs.readFile(path, 'utf8', (err, json) => {
        if (err) {
          console.error(err)
          throw err
        }
    
        const data = JSON.parse(json)
        b_read(Array.from(data))
        
      })
      
}


//Main Menu
console.log("1 : Create Book")
console.log("2 : List Books")
console.log("3 : Exit")
RL.question("Enter Choice : ",(c_MM)=>
{
    
    switch(parseInt(c_MM))
    {
        case 1:
            console.log("")
            RL.question("Enter Book name to Create : ",(name)=>
            {
                var b_name = name.toString()
                Fs.readdir(path,(err,books)=>
                {
                    if(err)
                    {
                        console.log(err)
                        throw err
                    }
                    if(books.includes(b_name+".txt"))
                    {
                        console.log("Book already Exist")
                    }
                    else
                    {
                        f_create(b_name)
                    }
                    
                });
                
            });
            break;
        case 2 :
            console.log("Book List : \n");
            console.log(list_books(path));
            
            //sub_menu();
            break;
        case 3 :
            process.exit()
            break;
    }
});

function print(arr)
{
    for(var i =0;i<arr.length;i++)
    {
        console.log("["+(i+1)+"] "+arr[i])
    }
}
function sub_menu() {
    console.log("1 Append to Book :");
    console.log("2 Insert line into Book :");
    console.log("3 Delete Line From Book :");
    console.log("4 Read Book :");
    console.log("5 Exit");
    RL.question("Enter Choice :", (c_sb) => {
        switch (parseInt(c_sb)) {
            case 1:
                console.log("Book List : \n");
                list_books(path);
                RL.question("Enter book name from list to append to : ", (name) => {
                    RL.question("Enter Line to Append :", (line) => {
                        b_append(name, line);
                    });
                });
                break;
            case 2:
                console.log("Book List : \n");
                list_books(path);
                RL.question("Enter book name to insert line into :", (name) => {
                    RL.question("Enter Line to insert : ", (line) => {
                        RL.question("Enter Line no : ", (line_no) => {
                            b_insert(name, line_no, line);
                        });
                    });
                });
                break;
            case 3:
                console.log("Book List : \n");
                list_books(path);
                RL.question("Enter book name to delete line from :", (name) => {
                    RL.question("Enter Line no for deletion : ", (line_no) => {
                        b_del(name, line_no);
                    });
                });
                break;
            case 4:
                console.log("Book List : \n");
                list_books(path);
                RL.question("Enter book name to read :", (name) => {
                    b_read(name);
                });
                break;
            case 5:
                process.exit();
                break;
        }
    });
}
