const Fs = require('fs')

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

console.log(writeToFile("sfdsfsd",'./abc.txt'))
console.log(readFromFile('./abc.txt'))