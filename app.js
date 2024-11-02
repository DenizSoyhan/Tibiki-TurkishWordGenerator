var fs = require('fs');
const writeStream = fs.createWriteStream('Output.txt');

var KSH = ['a','ı','o','u']; //kalın sesli harfler //BELKİ İLERİDE LAZIM OLUR               
var ISH = ['e','i','ö','ü']; //ince sesli harfler
var SZH = ['b', 'c', 'ç', 'd', 'g', 'ğ', 'h', 'k', 'l'  //J harfi olmaz türkçe kelimelerde
          ,'m', 'n', 'p', 'r', 's', 'ş', 't', 'v', 'y', 'z'];

var startSZH = ['b', 'c', 'ç', 'd', 'g', 'k', 'l' //J harfi olmaz türkçe kelimelerde
              , 'n', 'p', 'r', 's', 'ş', 't', 'v', 'y', 'z']; //a word can't start with m h ğ 

var sesliHarfler=['a','ı','o','u','e','i','ö','ü'];

//BELKİ İLERİDE LAZIM OLUR               
/*var düzÜnlü=['a','e','ı','i'] 
var yuvarlakÜnlü=['o','ö','u','ü']
var yuvarlakÜnlüFollower=['a','e','u','ü',]
var letterA='a'
var letterAFollowers=['a','ı'];

//new logic


var letterE='e'
var letterEFollowers=['e','i'];

var letterI='ı'
var letterIFollowers=['a','ı'];

var letterİ='i'
var letterİFollowers=['e','i'];

var letterO='o'
var letterOFollowers=['a','u'];

var letterÖ='ö'
var letterÖFollowers=['e','ü'];

var letterU='u'
var letterUFollowers=['a','u'];

var letterÜ='ü'
var letterÜFollowers=['e','ü'];*/ 


const letterFollowers = {
    'a': ['a', 'ı'],
    'e': ['e', 'i'],
    'ı': ['a', 'ı'],
    'i': ['e', 'i'],
    'o': ['a', 'u'],
    'ö': ['e', 'ü'],
    'u': ['a', 'u'],
    'ü': ['e', 'ü']
};

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

    var availableNextLetters;

  
    var aLetter;
    var sesliDecided=0;

    if (decideFirstLetter==1 && !firstLetterDecided){//ÜNLÜ İLE BAŞLAR KELİME
  
       aLetter=sesliHarfler[getRandomIntInRange(0,sesliHarfler.length-1)];
       syllable.push(aLetter);
       availableNextLetters=letterFollowers[`${aLetter}`];
      
       nextLetter=0; //SESİZ HARF
       sesliDecided=1;
    }else if(decideFirstLetter==0 && !firstLetterDecided){//ÜNSÜZ HARF İLE BAŞLAR

        syllable.push(startSZH[getRandomIntInRange(0,startSZH.length-1)]);
        nextLetter=1;
       
        if(syllableLen==1 && wordLen==1){ //eğer ilk harf sessiz ve kelime tek heceden oluşuyorsa yalnız 1 sessiz harf üretmesini engelle 
            noOneLetterConstWord=getRandomIntInRange(0,1)//0 ise kelimeyi uzat 1 ise heceyi
            if(noOneLetterConstWord==1){
            syllableLen=syllableLen+Number(getRandomIntInRange(1,2));
            }else if(noOneLetterConstWord==0){
                wordLen=wordLen+Number(getRandomIntInRange(1,2));
            }
        }
    }
    

    for(var j=0;j<wordLen;j++){

        if(firstLetterDecided==0){
            var k=1;
            firstLetterDecided=1;
        }else{
            var k=0;
        }
    
        for(;k<syllableLen;k++){
            if(nextLetter==0){ //ÜNSÜZ HARF EKLENECEK

                syllable.push(SZH[getRandomIntInRange(0,SZH.length-1)]);
                nextLetter=1;

            }else if(nextLetter==1){//ÜNLÜ HARF EKLENECEK

                if(sesliDecided==1){
                aLetter=availableNextLetters[getRandomIntInRange(0,1)];
                syllable.push(aLetter);
                availableNextLetters=letterFollowers[`${aLetter}`];

                }else{ 
                  // BURAYA GİRMESİ DEMEK İLK HARF SESSİZ HARFTİ İLK SESLİ HARF VE TÜRÜ BELİRLENECEK 
                //AŞAĞIDAKİLER YUKARIDAKİ KARAR MEKANİZMALARININ AYNISI

                aLetter=sesliHarfler[getRandomIntInRange(0,sesliHarfler.length-1)];
                syllable.push(aLetter);
                availableNextLetters=letterFollowers[`${aLetter}`];


                sesliDecided=1;
                }
            
                nextLetter=0; //SESSİZ HARF
            }
        
            firstLetterDecided=1;
        }

    }

    syllableList.push(syllable.join(""));
    var word=syllableList.join("");
    writeStream.write(`${word}\n`); 
    console.log(word);   
    
    
}

for(var i =0;i<10;i++){
    generateWord();
    //console.log();
}