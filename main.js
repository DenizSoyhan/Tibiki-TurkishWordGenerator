/*TODOS:

6-sepetiniz boş ise animasyon ile giriyor

*/

import {evolveWord, generateWord} from './wordgenerator.mjs'

const generatorButton=document.querySelector('#generator');
const evolverButton=document.querySelector('#evolver');

const infoButton=document.querySelector("#infoButton");
const modalContainer=document.querySelector("#modalContainer");
const closeModalButton=document.querySelector("#closeButton");

const generatedWordsContainer=document.querySelector('.generatedWordsContainer');
const generateButton=document.querySelector('#generate');

const selectedWordsContainer=document.querySelector('.selectedWordsContainer');

const generateButtonContainer = document.querySelector('#generateButtonContainer');

var whichPage=0; //0:GENERATOR 1:EVOLVER 
const theBag=document.querySelector('.selectedWordsContainer');

const generatorDiv=document.querySelector('.generatorDiv');
const evolverDiv=document.querySelector('.evolverDiv');

const mixButton=document.querySelector('#mix');
const toBeEvolvedContainer =document.querySelector('.toBeEvolvedContainer');

const finalChosenWords = document.querySelector('.finalChosenWords');
const allFinalChosenWords = document.querySelector('.allTheWords');

const downloadButton = document.querySelector('#downloadButton');

let isFirstClick=1;
let selectedWordCounter=0;



generatorButton.classList.add('activeButton');

infoButton.addEventListener('click', function(){
    modalContainer.style.display='block';
});

closeModalButton.addEventListener('click',function(){
    modalContainer.style.display='none';
})

window.addEventListener('click',function(e){
   if(e.target === modalContainer){
        modalContainer.style.display='none';
    }
})


if(whichPage==0){

    evolverDiv.classList.toggle('hidden')
}

generatorButton.addEventListener('click',function(){
    if(whichPage!=0){
        evolverDiv.style.animation='fadeOut 0.5s ease forwards';
        generatorDiv.style.animation='fadeIn 0.5s ease forwards';
         // Toggle active state classes
         generatorButton.classList.add('activeButton');
         evolverButton.classList.remove('activeButton');

        setTimeout(function() {
            evolverDiv.classList.toggle('hidden');
            generatorDiv.classList.toggle('hidden');
            
            whichPage = 0;
        }, 600);
    }
  
    
})

evolverButton.addEventListener('click',function(){
    if(whichPage!=1){
        generatorDiv.style.animation='fadeOut 0.5s ease forwards';//SEPET BOŞ OLUNCA GENE GELİYOR
        evolverDiv.style.animation='fadeIn 0.5s ease forwards';


        evolverButton.classList.add('activeButton');
        generatorButton.classList.remove('activeButton');
        setTimeout(function() {
            evolverDiv.classList.toggle('hidden');
            generatorDiv.classList.toggle('hidden');
            
            whichPage = 1;
        }, 600);
    }

    
})
function abstractionOfAddButton(e){  
    selectedWordsContainer.style.display='grid';
    if(selectedWordCounter==0){
        selectedWordsContainer.style.animation='fadeInUp .4s ease forwards';//TODO Sepetiniz animasyon çıkar 
        selectedWordCounter++;
    }else{
        
        selectedWordCounter++;
    }
    
    var selectedWordContainer=document.createElement('div') 
    selectedWordContainer.classList.add('selectedWordDiv');

    var selectedWord=document.createElement('div');
    selectedWord.classList.add('selectedWord');

    var trahsIconButton=document.createElement('i');
    trahsIconButton.classList.add('trashButton','fa-solid' ,'fa-trash');

    selectedWord.textContent=e.target.previousElementSibling.textContent;

    selectedWordContainer.appendChild(selectedWord) //TODO eğer 10dan fazla varsa sayfanın kaydığına dair imleç ekle
    selectedWordContainer.appendChild(trahsIconButton);

    theBag.appendChild(selectedWordContainer);

    trahsIconButton.addEventListener('click', function(){ 
        const allTheEvolvedWordContainers = document.querySelectorAll('.toBeEvolvedWordContainer');

        

        for (let s = 0; s < allTheEvolvedWordContainers.length; s++) {
            const wordElement = allTheEvolvedWordContainers[s].querySelector('.toBeEvolvedWord');
    
            // ekleme işlemleri sırasında bir yerde white space oluşuyor sanırım o yüzden böyle conditional yazdım
            if (wordElement && wordElement.textContent.trim() === selectedWordContainer.children[0].textContent.trim()) {
                allTheEvolvedWordContainers[s].remove(); 
                break; // Stop after removing the first match
            }
        }
        
        selectedWordCounter--;
        if(selectedWordCounter!=0){    
            selectedWordContainer.style.animation= 'fadeOut .4s ease forwards'; 
            selectedWordContainer.addEventListener('animationend', function() {
            selectedWordContainer.remove();

            rearrangeGrid();
            })
        }else{
            selectedWordContainer.style.animation= 'fadeOut .4s ease forwards'; 
            selectedWordContainer.addEventListener('animationend', function() {
            selectedWordContainer.remove();
            })
            selectedWordsContainer.style.animation='fadeOut .4s ease forwards';
        }

        


    

});
    

function rearrangeGrid() {
    // Trigger a reflow for the grid layout to update
    selectedWordsContainer.style.display = 'none';
    selectedWordsContainer.offsetHeight; // trigger reflow
    selectedWordsContainer.style.display = 'grid';
}
var toBeEvolvedWordContainer=document.createElement('div') 
    toBeEvolvedWordContainer.classList.add('toBeEvolvedWordContainer');

    var wordsContainer=document.createElement('div');
    wordsContainer.classList.add('wordsContainer');

    var toBeEvolvedWord=document.createElement('div');
    toBeEvolvedWord.classList.add('toBeEvolvedWord');

    var finalizeWordButton=document.createElement('i');
    finalizeWordButton.classList.add('toBeEvolvedFinalizeButton','fa-solid' ,'fa-cart-plus');

    toBeEvolvedWord.textContent=e.target.previousElementSibling.textContent;

    wordsContainer.appendChild(toBeEvolvedWord);
    wordsContainer.appendChild(finalizeWordButton);

    toBeEvolvedWordContainer.appendChild(wordsContainer)

    toBeEvolvedContainer.appendChild(toBeEvolvedWordContainer) 
    


    
}
function makeWords(){


    generatedWordsContainer.innerHTML = '';

        for(var i=0;i<6;i++ ){

            

            var aWordContainer=document.createElement('div');
            aWordContainer.classList.add('wordContainer');
            
            const wordDiv = document.createElement('div');
            wordDiv.classList.add('word');
            wordDiv.textContent = generateWord();
        
            const addButtonIcon = document.createElement('i');
            addButtonIcon.classList.add('addList','fa-solid', 'fa-plus'); 

            

            aWordContainer.appendChild(wordDiv);
            aWordContainer.appendChild(addButtonIcon);
            
            generatedWordsContainer.appendChild(aWordContainer);
        
            selectedWordsContainer.style.opacity = '1';


        setTimeout(() => {
            selectedWordsContainer.style.borderTopColor = '#e2ccc0';
        }, 100);
    }
    
    if (isFirstClick) {
      
        generateButtonContainer.classList.remove('center','show');
        generateButtonContainer.classList.add('bottom');
        


        
       
    }
  
    if(isFirstClick){
        window.addEventListener('click',function(e){
            if(e.target.classList.contains('addList')){
                abstractionOfAddButton(e);
            }
    });
    isFirstClick = 0;  
    }
}


generateButtonContainer.classList.add('center');
setTimeout(() => generateButtonContainer.classList.add('show'), 100); // Delay to ensure CSS transition applies

generateButton.addEventListener('click',()=>{
    makeWords();
});

/* EVOLVE SIDE*/
function updateTextWithFade(element, newText) {
    const evolveWordContainer = element.parentElement.parentElement;

    evolveWordContainer.classList.remove('evolveWordContainer');

    // Force a reflow to reset the animation
    void evolveWordContainer.offsetWidth;


    evolveWordContainer.classList.add('evolveWordContainer');


    element.textContent = newText;
}

mixButton.addEventListener('click', function(){
    
    if(selectedWordCounter==0){
        alert("Lütfen kelime türetmeden önce sepetinize üreticiden kelime ekleyiniz!")
    }else{
        var allTheEvolvedWordContainers = document.querySelectorAll('.toBeEvolvedWordContainer');

        for (let z = 0; z < allTheEvolvedWordContainers.length; z++) {
    
            if(allTheEvolvedWordContainers[z].classList.contains('expanded')){
                var startWord = allTheEvolvedWordContainers[z].children[0].textContent;
        

                var finalWords = allTheEvolvedWordContainers[z].querySelectorAll('.finalFinalWord');
                
        
                for (let u = 0; u < finalWords.length; u++) {
        
                    updateTextWithFade(finalWords[u],evolveWord(startWord))
        
                }
            }else{  
                var startWord=allTheEvolvedWordContainers[z].textContent;
                
                allTheEvolvedWordContainers[z].classList.add('expanded');
                var unorderedList=document.createElement('ul');
                for(let u=0;u<5;u++){
                
        
                var evolveWordContainer=document.createElement('div');
                evolveWordContainer.classList.add('evolveWordContainer');
                
                var finalFinalWord=document.createElement('div');
                finalFinalWord.classList.add('finalFinalWord');
                finalFinalWord.textContent=evolveWord(startWord);
        
                var evolvedWord=document.createElement('li');
                evolvedWord.classList.add('evolvedWord');
                
                
                var finalizeEvolvedButton=document.createElement('i')
                finalizeEvolvedButton.classList.add('toBeEvolvedFinalizeButton','fa-solid' ,'fa-cart-plus');
        
                evolvedWord.appendChild(finalFinalWord);
                evolvedWord.appendChild(finalizeEvolvedButton);
                evolveWordContainer.appendChild(evolvedWord);
                unorderedList.appendChild(evolveWordContainer);
        
                
                
                }
                allTheEvolvedWordContainers[z].appendChild(unorderedList);

            }
            
           
        }
        
       
    }
})

window.addEventListener('click', function(e){
    if(e.target.classList.contains('toBeEvolvedFinalizeButton')){


        let chosenWordContainer=document.createElement('div');
        chosenWordContainer.classList.add('chosenWordContainer');

        let finalWord=document.createElement('div');
        finalWord.classList.add('finalWord');
        finalWord.textContent=e.target.previousElementSibling.textContent

        let deleteFromChosenButton=document.createElement('i');
        deleteFromChosenButton.classList.add('deleteFromChosenButton' ,'fa-solid' ,'fa-trash');

        chosenWordContainer.appendChild(finalWord);
        chosenWordContainer.appendChild(deleteFromChosenButton);
        
        deleteFromChosenButton.addEventListener('click', function(){
            const parentContainer = deleteFromChosenButton.parentElement;
    
            // Add a fade-out class to trigger the CSS transition
           
            parentContainer.classList.add('fade-out');


            setTimeout(() => {
                parentContainer.remove();
            }, 500); 
        })
        allFinalChosenWords.appendChild(chosenWordContainer);
    }
})

downloadButton.addEventListener('click', function(){
    let allTheWordsContainers=document.querySelectorAll('.chosenWordContainer');
    
    let wordlist=[];

    for(let i=0;i<allTheWordsContainers.length;i++){
        wordlist.push(allTheWordsContainers[i].textContent);
        
    }
    

    if(wordlist.length==0){
        alert("Hiçbir Kelime Seçilmemiş!")
    }else{
    let textToDownload=wordlist.join("\n");

    const blob = new Blob([textToDownload], { type: 'text/plain' });


    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'downloadedText.txt';


    link.click();
    }
    

})