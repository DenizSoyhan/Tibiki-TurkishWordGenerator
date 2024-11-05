import {generateWord} from './wordgenerator.mjs'

const generatedWordsContainer=document.querySelector('.generatedWordsContainer');
const generateButton=document.querySelector('#generate');

const selectedWordsContainer=document.querySelector('.selectedWordsContainer');

const generateButtonContainer = document.querySelector('#generateButtonContainer');

const theBag=document.querySelector('.selectedWordsContainer');

let isFirstClick=1;

function abstractionOfAddButton(e){ //#TODO animasyon ekle

    var selectedWordContainer=document.createElement('div') 
    selectedWordContainer.classList.add('selectedWordDiv');

    var selectedWord=document.createElement('div');
    selectedWord.classList.add('selectedWord');

    var trahsIconButton=document.createElement('i');
    trahsIconButton.classList.add('trashButton','fa-solid' ,'fa-trash');

    selectedWord.textContent=e.target.previousElementSibling.textContent;

    selectedWordContainer.appendChild(selectedWord)
    selectedWordContainer.appendChild(trahsIconButton);

    theBag.appendChild(selectedWordContainer);
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
        
        
    
    }
    
    if (isFirstClick) {
      
        generateButtonContainer.classList.remove('center','show');
        generateButtonContainer.classList.add('bottom');
        
        selectedWordsContainer.style.display = 'grid' ;

        
       
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




