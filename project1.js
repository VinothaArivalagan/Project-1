document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('startButton');
    const endButton = document.getElementById('endButton');
    const scoreDisplay = document.querySelector('.score');
    const holes = document.querySelectorAll('.hole1, .hole2, .hole3, .hole4, .hole5, .hole6');
    const monkeys = document.querySelectorAll('.monkey1, .monkey2, .monkey3, .monkey4, .monkey5, .monkey6');
    let score = 0;
    let timeLeft = 60;
    let gameStarted = false;
    let timer;
    let timerUpdate;

    function startGame() {
        gameStarted = true;
        startButton.disabled = true;
        endButton.disabled = false;
        score = 0;
        timeLeft = 60;
        updateScore();
        updateTimer();

        monkeys.forEach(monkey => {
            monkey.style.display = 'none';
            monkey.addEventListener('click', bonkMonkey);
        });

        timer = setInterval(function () {
            const randomHoleIndex = Math.floor(Math.random() * holes.length);
            const hole = holes[randomHoleIndex];
            const monkey = monkeys[randomHoleIndex];
            hole.style.display = 'block';

            monkey.style.display = 'block';
        
            setTimeout(function() {
                monkey.style.display = 'none';
            }, 2000); 
        
        }, 1000);


        timerUpdate = setInterval(function () {
            timeLeft--;
            updateTimer();
            if (timeLeft === 0) {
                endGame();
            }
        }, 1000);
    }

    function endGame() {
        gameStarted = false;
        clearInterval(timer);
        clearInterval(timerUpdate); 
        endButton.disabled = true;
        startButton.disabled = false;
        alert('Game Over! Your final score is ' + score);
    }

    function bonkMonkey() {
        if (!gameStarted) return;
            score++;
            updateScore();
        }
    

    function updateScore() {
        scoreDisplay.textContent = 'Score: ' + score;
    }
    
    function updateTimer() {
        if (timeLeft > 0) {
            document.getElementById('timer').textContent = 'Time:' + timeLeft + 's';
        } else {
            document.getElementById('timer').textContent = 'Time: 0s';
        }
    }

    startButton.addEventListener('click', startGame);
    endButton.addEventListener('click', endGame); 


    });
