var arr1 = [],
    arr2 = [];


var text1 = "мамба фигамба амбасадор мыла раму ";
var text2 = "мамба фигамба амбасадор мыла раму мыла мыла мыла";

console.log(hex_md5("text1"))
console.log(hex_md5("text1"))

function canonization (text){
    var result1 =  text.replace(/[,."'?!\-+=:;]|[\s][а-я]{1,3}[\s]/ig, "");
    var result2 = result1.replace(/\s{1,}/ig, " ");
    return result2.replace(/^\s|\s$/g, "");
}



arr1 = canonization(text1).split(" ");
arr2 = canonization(text2).split(" ");

/*function Addshingles (words) {
    var shingles = [];
    while(words.length > 0){
        shingles.push(words.splice(0, 2).join(' '))
    }
    return shingles
}


Addshingles(canonization(text1).split(" "))

*/
var count = 0;
for(var i = 0; i < arr1.length || i < arr2.length; i++){
    if(arr1[i] === arr2[i]){
        count++;
        console.log(arr1[i])
        console.log(arr2[i])
    }
}



console.log(Math.round(count*100/((arr1.length+arr2.length)/2)) + "%")