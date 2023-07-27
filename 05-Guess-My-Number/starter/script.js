'use strict';

let secret_number = Math.trunc(Math.random() * 20 + 1);
let highscore = 0;
let score = 20;
const displayMessage = function(message){
    document.querySelector('.message').textContent = message;
}

document.querySelector('.check').addEventListener('click',function() {
    const guess = Number(document.querySelector('.guess').value);
    console.log(guess, typeof guess); 

    if (!guess){
        displayMessage('No Number!');
    }
    else if (guess ===secret_number){
    
        displayMessage('Correct Number!');
        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.number').textContent =secret_number;

        if (score > highscore){
            document.querySelector('.highscore').textContent = score;
            highscore = score;
        }
    }
    else if(guess !== secret_number){
        if (score > 1){
            displayMessage(guess > secret_number ? 'Too High!' : 'Too Low!'); 
            score --;
            document.querySelector('.score').textContent = score;
        }
        else{
            displayMessage('You Lost the Game!');
            document.querySelector('.score').textContent = 0;
        }
    };
   
});

document.querySelector('.again').addEventListener('click', function(){
    score = 20;
    secret_number = Math.trunc(Math.random() * 20 + 1);
    displayMessage('Start guessing...');
    document.querySelector('.score').textContent = score;
    document.querySelector('.number').textContent ='?';
    document.querySelector('.guess').value = '';
    document.querySelector('body').style.backgroundColor = '#222';
});