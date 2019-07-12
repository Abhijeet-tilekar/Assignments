const FS = require('fs');
const RL = require('readline-sync');

//Create Dictionary from JSON to Map
var dict_r = JSON.parse(FS.readFileSync("./result.json"));
const dict_db = new Map();
for (let k of Object.keys(dict_r)) {
    dict_db.set(k, dict_r[k]);
}
let enntries = dict_db.entries();
console.log(dict_db.has("JAMISON"))