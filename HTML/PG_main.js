function gen(){
    out = "abcd";
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 12; i++ ) {
      out += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    alert(out);
}
