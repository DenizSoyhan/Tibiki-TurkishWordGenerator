var fs = require('fs');
const writeStream = fs.createWriteStream('Output.txt');

var KSH = ['a','ı','o','u']; //kalın sesli harfler
var ISH = ['e','i','ö','ü']; //ince sesli harfler
var SZH = ['b', 'c', 'ç', 'd', 'g', 'ğ', 'j', 'h', 'k', 'l'
          ,'m', 'n', 'p', 'r', 's', 'ş', 't', 'v', 'y', 'z'];

var startSZH = ['b', 'c', 'ç', 'd', 'g', 'j', 'k', 'l'
              , 'n', 'p', 'r', 's', 'ş', 't', 'v', 'y', 'z']; //a word can't start with m h ğ 

function getRandomIntInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateWord(){
    
    var decideFirstLetter = getRandomIntInRange(0, 1); //1 Ünlü - 0 Ünsüz 
    var syllable=[];
    var syllableList=[];
    var syllableLen=getRandomIntInRange(1,3);
    var wordLen=getRandomIntInRange(1,3);
    var nextLetter;//1 ünlü 0 ünsüz 
    var firstLetterDecided=0;

    if (decideFirstLetter==1){
        var KSHorISH=getRandomIntInRange(0,1); //1 kalın - 0 ünlü
         //syllables can be 3 letters long
        if(KSHorISH==1){
            syllable.push(KSH[getRandomIntInRange(0,KSH.length-1)]);
            nextLetter=0;
        }else if(KSHorISH==0){
            syllable.push(KSH[getRandomIntInRange(0,ISH.length-1)]);
            nextLetter=0;
        }
    }else if(decideFirstLetter==0){
        syllable.push(startSZH[getRandomIntInRange(0,startSZH.length-1)]);
        nextLetter=1;
    }
    
    //console.log(syllable.join(""),nextLetter);
    for(var j=0;j<wordLen;j++){
        if(firstLetterDecided==0){
        var k=1;
    }else{
        var k=0;
    }
    
    for(var k=0;k<syllableLen;k++){
        if(nextLetter==0){

            syllable.push(SZH[getRandomIntInRange(0,SZH.length-1)]);
            nextLetter=1;

        }else if(nextLetter==1){
            KSHorISH=getRandomIntInRange(0,1); //1 kalın - 0 ünlü

            if(KSHorISH==1){
                syllable.push(KSH[getRandomIntInRange(0,KSH.length-1)]);
                nextLetter=0;
            }else if(KSHorISH==0){
                syllable.push(ISH[getRandomIntInRange(0,ISH.length-1)]);
                nextLetter=0;
            }
            
            nextLetter=0;
        }
        
        
    }
    
    firstLetterDecided=1;
    }
    //console.log(syllable);
    syllableList.push(syllable.join(""));
    var word=syllableList.join("");
    writeStream.write(`${word}\n`); 
    console.log(word);   
    
}

for(var i =0;i<20;i++){
    generateWord();
}