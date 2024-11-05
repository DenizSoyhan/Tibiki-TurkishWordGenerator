import {generateWord} from './wordgenerator.mjs'

const generatedWordsContainer=document.querySelector('.generatedWordsContainer');
const generateButton=document.querySelector('#generate');

const selectedWordsContainer=document.querySelector('.selectedWordsContainer');

const generateButtonContainer = document.querySelector('#generateButtonContainer');

const theBag=document.querySelector('.selectedWordsContainer');

let isFirstClick=1;
let selectedWordCounter=0;

function abstractionOfAddButton(e){ 
    selectedWordsContainer.style.display='grid';
    if(selectedWordCounter==0){
        selectedWordsContainer.style.animation='fadeInUp .4s ease forwards';
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

    selectedWordContainer.appendChild(selectedWord)
    selectedWordContainer.appendChild(trahsIconButton);

    theBag.appendChild(selectedWordContainer);

    trahsIconButton.addEventListener('click', function(){
        selectedWordCounter--;
        

        // Wait for the animation to complete before removing the element  
        if(selectedWordCounter!=0){    
            selectedWordContainer.style.animation= 'fadeOut .4s ease forwards'; 
            selectedWordContainer.addEventListener('animationend', function() {
            selectedWordContainer.remove();
            console.log(selectedWordsContainer," ",selectedWordCounter)
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

        //border-top-color with a slight delay s
        setTimeout(() => {
            selectedWordsContainer.style.borderTopColor = '#e2ccc0';
        }, 100);
    }
    
    if (isFirstClick) {
      
        generateButtonContainer.classList.remove('center','show');
        generateButtonContainer.classList.add('bottom');
        
        //selectedWordsContainer.style.display = 'grid' ;

        
       
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




