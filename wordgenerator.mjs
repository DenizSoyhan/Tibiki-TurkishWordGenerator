var KSH = ['a','ı','o','u']; //kalın sesli harfler //BELKİ İLERİDE LAZIM OLUR               
var ISH = ['e','i','ö','ü']; //ince sesli harfler
var SZH = ['b', 'c', 'ç', 'd', 'g', 'ğ', 'h', 'k', 'l'  //J harfi olmaz türkçe kelimelerde
          ,'m', 'n', 'p', 'r', 's', 'ş', 't', 'v', 'y', 'z'];

var startSZH = ['b', 'c', 'ç', 'd', 'g', 'k', 'l' //J harfi olmaz türkçe kelimelerde
              , 'n', 'p', 'r', 's', 'ş', 't', 'v', 'y', 'z']; //bir kelime "m , h , ğ" ile başlayamaz 

var sesliHarfler=['a','ı','o','u','e','i','ö','ü'];

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

const weightedWordLengthOdds=[1, 2, 2, 2, 2, 3, 3, 3, 3, 3 ]  //uzun kelimeleri daha olası yapmak için 1:10% 2:40% 3:50%

function getRandomIntInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateWord(){
    
    var decideFirstLetter = getRandomIntInRange(0, 1); //1 Ünlü - 0 Ünsüz 
    var syllable=[];
    var syllableList=[];
    var syllableLen=getRandomIntInRange(1,3);
    var wordLen=weightedWordLengthOdds[getRandomIntInRange(0,weightedWordLengthOdds.length-1)];
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
            var noOneLetterConstWord=getRandomIntInRange(0,1)//0 ise kelimeyi uzat 1 ise heceyi
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

    return word; 
    
    
}

var tümSZH = ['b', 'c', 'ç', 'd', 'g', 'ğ', 'h', 'k', 'l'  //J harfi eklendi
    ,'m', 'n', 'p', 'r', 's', 'ş', 't', 'v', 'y', 'z'];

let weightedEvolveOdds=[[0, 0, 0, 0, 0, 0, 0, 1, 1, 1 ],    //evrimleşme oranları; kısa kelimelerin evrimleşme oranı daha fazla
               [0, 0, 0, 0, 0, 0, 1, 1, 1, 1 ],    //%40
               [0, 0, 0, 0, 1, 1, 1, 1, 1, 1 ],    //%60
               [0, 0, 0, 1, 1, 1, 1, 1, 1, 1 ],    //%70
               [0, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],    //%90
               [1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],    //%100
]  


export function evolveWord(aWord){

let input=aWord;

input=input.split("")

let whichOdds; //kısa kelimeler daha sık evrimleşmeli
if(aWord.length==1){ 
whichOdds=5;
}else if(aWord.length==2 || aWord.length==3){
whichOdds=3;
}else if(aWord.length>=4 || aWord.length<7){
whichOdds=1;
}else{
whichOdds=0;
}

for(let i=0;i<input.length;i++){

if(tümSZH.includes(input[i])){

   if(weightedEvolveOdds[whichOdds][getRandomIntInRange(0, weightedEvolveOdds[0].length-1)]){ //evrimleşecek ya da evrimleşmeyecek

       let changingLetter = tümSZH[getRandomIntInRange(0,tümSZH.length-1)];
       input[i]=changingLetter;

   }
}else if(sesliHarfler.includes(input[i])){

   if(weightedEvolveOdds[whichOdds][getRandomIntInRange(0,weightedEvolveOdds[0].length-1)]){

   let changingLetter = sesliHarfler[getRandomIntInRange(0,sesliHarfler.length-1)];
   input[i]=changingLetter;
   }
}
}

return input.join("");

}
