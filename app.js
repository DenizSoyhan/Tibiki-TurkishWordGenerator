var fs = require('fs');
const writeStream = fs.createWriteStream('Output.txt');

var KSH = ['a','ı','o','u']; //kalın sesli harfler
var ISH = ['e','i','ö','ü']; //ince sesli harfler
var SZH = ['b', 'c', 'ç', 'd', 'g', 'ğ', 'h', 'k', 'l'  //J harfi olmaz türkçe kelimelerde
          ,'m', 'n', 'p', 'r', 's', 'ş', 't', 'v', 'y', 'z'];

var startSZH = ['b', 'c', 'ç', 'd', 'g', 'k', 'l' //J harfi olmaz türkçe kelimelerde
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

    var firstKalinORince; //1 kalın 0 ince

    if (decideFirstLetter==1 && !firstLetterDecided){//ÜNLÜ İLE BAŞLAR KELİME
        var KSHorISH=getRandomIntInRange(0,1); //1 kalın - 0 ünlü
        firstKalinORince=KSHorISH;
         //syllables can be 3 letters long
        if(KSHorISH==1){ //KALIN ÜNLÜ HARF
            let controll=KSH[getRandomIntInRange(0,KSH.length-1)]
            syllable.push(controll);
            //console.log(controll)
            nextLetter=0;
            //İLK HECEDE KALIN ÜNLÜ VAR
        }else if(KSHorISH==0){//İNCE ÜNLÜ HARF
            syllable.push(ISH[getRandomIntInRange(0,ISH.length-1)]);
            nextLetter=0;
          
        }
    }else if(decideFirstLetter==0 && !firstLetterDecided){//ÜNSÜZ HARF İLE BAŞLAR

        syllable.push(startSZH[getRandomIntInRange(0,startSZH.length-1)]);
        nextLetter=1;
        //console.log(`kelime uzunluğu: ${wordLen}  hece uzunluğu: ${syllableLen}`)
        if(syllableLen==1 && wordLen==1){ //eğer ilk harf sessiz ve kelime tek heceden oluşuyorsa yalnız 1 sessiz harf üretmesini engelle 
            noOneLetterConstWord=getRandomIntInRange(0,1)//0 ise kelimeyi uzat 1 ise heceyi
            if(noOneLetterConstWord==1){
            syllableLen=syllableLen+Number(getRandomIntInRange(1,2));
            }else if(noOneLetterConstWord==0){
                wordLen=wordLen+Number(getRandomIntInRange(1,2));
            }
        }
    }
    
    //console.log(syllable.join(""),nextLetter);
    for(var j=0;j<wordLen;j++){
       // console.log("kelime loop:",j, " yeni kelime uzunluğu: ", wordLen," yeni hece uzunluğu: ", syllableLen);
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
                //KSHorISH=getRandomIntInRange(0,1); //1 kalın - 0 ünlü

                if(firstKalinORince==1){//KALIN ÜNLÜ EKLENECEK ÇÜNKÜ İLK EKLENEN SESLİ HARF KALIN
                    let letter=KSH[getRandomIntInRange(0,KSH.length-1)]
                    syllable.push(letter);
                    //console.log("kalin: ", letter)
                    
                }else if(firstKalinORince==0){//İNCE ÜNLÜ EKLENECEK ÇÜNKÜ İLK EKLENEN SESLİ HARF İNCE
                    let letter=ISH[getRandomIntInRange(0,ISH.length-1)]
                    syllable.push(letter);
                    //console.log("ince: ", letter)
                    
                }else{
                    
                    firstKalinORince=getRandomIntInRange(0,1); // BURAYA GİRMESİ DEMEK İLK HARF SESSİZ HARFTİ İLK SESLİ HARF VE TÜRÜ BELİRLENECEK 
                    //AŞAĞIDAKİLER YUKARIDAKİ KARAR MEKANİZMALARININ AYNISI
                    if(firstKalinORince==0){//KALIN ÜNLÜ EKLENECEK ÇÜNKÜ İLK EKLENEN SESLİ HARF KALIN
                        syllable.push(KSH[getRandomIntInRange(0,KSH.length-1)]);
                        firstKalinORince=1;
                       
                    }else if(firstKalinORince==1){//İNCE ÜNLÜ EKLENECEK ÇÜNKÜ İLK EKLENEN SESLİ HARF İNCE
                        syllable.push(ISH[getRandomIntInRange(0,ISH.length-1)]);
                        firstKalinORince=0;
                        
                    }
                //console.log("ilk harf sessizdi: ",firstKalinORince);
                
                }
            
                nextLetter=0;
            }
        
            firstLetterDecided=1;
        }
        //console.log(syllable.join(""));
    }
    //console.log(syllable);
    syllableList.push(syllable.join(""));
    var word=syllableList.join("");
    writeStream.write(`${word}\n`); 
    console.log("word: ", word);   
    
    
}

for(var i =0;i<10;i++){
    generateWord();
    //console.log();
}