var fs = require('fs');
/*
function a(){
    console.log('A');
}
*/
var a = function(){
    console.log('A');
}

function slowfunc(callback){
    callback();
}

slowfunc(a);
