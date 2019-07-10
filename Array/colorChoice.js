color = [" ","Blue ", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow "];
o = [" ","st","nd","rd","th"]

for(let i=1;i < color.length; i++){
   console.log(i+((o[i])? o[i] : o[4])+" choice is "+color[i]);
}

