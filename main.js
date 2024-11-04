import {generateWord} from './wordgenerator.mjs'

const generatedWordsContainer=document.querySelector('.generatedWordsContainer');
const generateButton=document.querySelector('#generate');



const generateButtonContainer = document.querySelector('#generateButtonContainer');


let isFirstClick=1;
function makeWords(){


    generatedWordsContainer.innerHTML = '';

        for(var i=0;i<6;i++ ){

            

            var aWordContainer=document.createElement('div');
            aWordContainer.classList.add('wordContainer');
            
            const wordDiv = document.createElement('div');
            wordDiv.classList.add('word');
            wordDiv.textContent = generateWord();
        
            const addButtonIcon = document.createElement('i');
            addButtonIcon.classList.add('fa-solid', 'fa-plus'); 
            addButtonIcon.id = 'addList';
        
            aWordContainer.appendChild(wordDiv);
            aWordContainer.appendChild(addButtonIcon);
            
            generatedWordsContainer.appendChild(aWordContainer);
        
        
    
    }
    
    if (isFirstClick) {
      
        generateButtonContainer.classList.remove('center');
        generateButtonContainer.classList.add('bottom');
        
        isFirstClick = 0;
    }

}

generateButtonContainer.classList.add('center');


generateButton.addEventListener('click',()=>{
    makeWords();
});
