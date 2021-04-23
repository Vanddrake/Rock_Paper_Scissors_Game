/*
  Author:   Robert Zaranek
  Date:     November 11, 2020

  Purpose:  The JavaScript portion of the "Rock-Paper-Scissors" game.
*/

/**
 * The 'Main' method, activates upon DOM load completion.
 */
window.addEventListener("load", function () {

    // Main Game Variables
    let username;
    let age;
    let color;
    let round_amount;
    let current_round = 0;
    let wins = 0;
    let player_choice;
    let opponent_choice = "";
    
    // Game Sounds
    let beepSound = new Sound("sound/beep.wav");
    let winSound = new Sound("sound/win.wav");
    let loseSound = new Sound("sound/lose.flac");
    let roundWinSound = new Sound("sound/round_win.wav");
    let roundLoseSound = new Sound("sound/round_lose.wav");
    let tieSound = new Sound("sound/tie.wav");

    /**
     * Event listener function for submitting the Player Info Form.
     */
    document.forms.main_form.addEventListener("submit", function (event) {
        event.preventDefault();
        username = document.forms.main_form.name.value;
        age = document.forms.main_form.age.value;
        color = document.forms.main_form.color.value;
        round_amount = document.forms.main_form.round_amount.value;
        showPlayerTurnScreen();

        // Changes colours of buttons to player's favourite colour
        for (i = 0; i < document.getElementsByClassName("img_container").length; i++) {
            document.getElementsByClassName("img_container")[i].style.backgroundColor = color;
        }
    });

    /**
     * Event listener function for clicking the 'Rock' button.
     */
    document.getElementById("rock").addEventListener("click", function () {
        player_choice = "rock";
        showOpponentTurnScreen();
    });

    /**
     * Event listener function for clicking the 'Paper' button.
     */
    document.getElementById("paper").addEventListener("click", function () {
        player_choice = "paper";
        showOpponentTurnScreen();
    });

    /**
     * Event listener function for clicking the 'Scissors' button.
     */
    document.getElementById("scissors").addEventListener("click", function () {
        player_choice = "scissors";
        showOpponentTurnScreen();
    });

    /**
     * Event listener function for clicking the 'Help' button.
     */
    document.getElementById("help_button").addEventListener("click", function clickHelp() {
        document.getElementById("help_screen").style.display = "block";
        /**
         * Fades-in the instructions window and removes the 'Help' button event listener.
         */
        setTimeout(function () {
            document.getElementById("help_screen").style.opacity = "1";
            document.getElementById("help_button").removeEventListener("click", clickHelp);
            /**
             * Event listener function for clicking anywhere in the window and
             * Fading-out the instructions window.
             */
            window.addEventListener("click", function clickAnywhere() {
                document.getElementById("help_screen").style.opacity = "0";
                /**
                 * Removes the clickAnywhere event listener
                 * and re-adds the 'Help' button event listener.
                 */
                setTimeout(function () {
                    document.getElementById("help_screen").style.display = "none";
                    window.removeEventListener("click", clickAnywhere);
                    document.getElementById("help_button").addEventListener("click", clickHelp);
                }, 300);
            });
        }, 1);
    });

    /**
     * Event listener function for reseting the game upon clicking the 'Play Again' button.
     */
    document.getElementById("play_again_button").addEventListener("click", function () {
        document.getElementById("results_screen").style.display = "none";
        document.getElementById("player_info_form").style.display = "block";
        wins = 0;
        current_round = 0;
    });

    /**
     * A Sound class to that adds a sound player to the DOM and
     * contains a method to play the sound.
     */
    function Sound(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        /**
         * Plays the current sound of this Sound object.
         */
        this.play = function(){
          this.sound.play();
        }
      }

    /**
     * A function that updates the game_screen with current variables.
     */
    function showPlayerTurnScreen() {
        document.getElementById("player_info_form").style.display = "none";
        document.getElementById("opponent_screen").style.display = "none";
        document.getElementById("game_screen").style.display = "block";
        document.getElementsByTagName("h3")[0].innerHTML = "Welcome " + username +
            ",<br> The " + age + " Year Old.";
        document.getElementsByTagName("h3")[1].innerHTML = "<em>Round: " + (current_round + 1) +
            " of " + round_amount + " | " +
            wins + " Wins / " + (current_round - wins) + " Loses</em>";
    }

    /**
     * The main gameplay loop of this program. Plays out the opponent's turn 
     * and ends the game if enough rounds are reached.
     */
    function showOpponentTurnScreen() {        
        document.getElementById("game_screen").style.display = "none";
        document.getElementById("opponent_screen").style.display = "block";
        document.getElementsByTagName("h3")[2].innerHTML = "";
        let isTie = false;

        for (i = 0; i < 10; i++) {
            let random_choice = Math.floor(Math.random() * 3);
            /**
             * Plays an animation of the opponent choosing their move.
             */
            setTimeout(function () {
                if (random_choice === 0) {
                    opponent_choice = "rock";
                    document.getElementsByClassName("img_container2")[1].style.display = "none";
                    document.getElementsByClassName("img_container2")[2].style.display = "none";
                    document.getElementsByClassName("img_container2")[0].style.display = "grid";
                } else if (random_choice === 1) {
                    opponent_choice = "paper";
                    document.getElementsByClassName("img_container2")[0].style.display = "none";
                    document.getElementsByClassName("img_container2")[2].style.display = "none";
                    document.getElementsByClassName("img_container2")[1].style.display = "grid";
                } else if (random_choice === 2) {
                    opponent_choice = "scissors";
                    document.getElementsByClassName("img_container2")[0].style.display = "none";
                    document.getElementsByClassName("img_container2")[1].style.display = "none";
                    document.getElementsByClassName("img_container2")[2].style.display = "grid";
                }
                beepSound.play();
            }, i * 200);
        }

        /**
         * Displays the results of the opponent's move after the previous animation has played.
         */
        setTimeout(function () {
            if (opponent_choice === "rock") {
                if (player_choice === "rock") {
                    document.getElementsByTagName("h3")[2].innerHTML = "You Tied! Rematch!";
                    tieSound.play();
                    isTie = true;
                } else if (player_choice === "paper") {
                    document.getElementsByTagName("h3")[2].innerHTML = "You Won!";
                    roundWinSound.play();
                    wins++;
                } else if (player_choice === "scissors") {
                    document.getElementsByTagName("h3")[2].innerHTML = "You Lost!";
                    roundLoseSound.play();
                }
            } else if (opponent_choice === "paper") {
                if (player_choice === "rock") {
                    document.getElementsByTagName("h3")[2].innerHTML = "You Lost!";
                    roundLoseSound.play();
                } else if (player_choice === "paper") {
                    document.getElementsByTagName("h3")[2].innerHTML = "You Tied! Rematch!";
                    tieSound.play();
                    isTie = true;
                } else if (player_choice === "scissors") {
                    document.getElementsByTagName("h3")[2].innerHTML = "You Won!";
                    roundWinSound.play();
                    wins++;
                }
            } else if (opponent_choice === "scissors") {
                if (player_choice === "rock") {
                    document.getElementsByTagName("h3")[2].innerHTML = "You Won!";
                    roundWinSound.play();
                    wins++;
                } else if (player_choice === "paper") {
                    document.getElementsByTagName("h3")[2].innerHTML = "You Lost!";
                    roundLoseSound.play();
                } else if (player_choice === "scissors") {
                    document.getElementsByTagName("h3")[2].innerHTML = "You Tied! Rematch!";
                    tieSound.play();
                    isTie = true;
                }
            }
            if (!isTie) {
                current_round++;
            }
        }, 2000);

        /**
         * Checks if win/loss conditions are met. 
         * If conditions are not met, allows the user to make another move.
         */
        setTimeout(function () {
            if (wins > (round_amount / 2)) {
                document.getElementById("opponent_screen").style.display = "none";
                document.getElementById("results_screen").style.display = "block";
                document.getElementById("results_picture").src = "img/smiley.png";
                document.getElementById("results_picture").alt = "a smiley face";
                document.getElementById("results_message").innerHTML = "YOU WON!!!";
                winSound.play();
            } else if ((current_round - wins) > (round_amount / 2)) {
                document.getElementById("opponent_screen").style.display = "none";
                document.getElementById("results_screen").style.display = "block";
                document.getElementById("results_picture").src = "img/computer.png";
                document.getElementById("results_picture").alt = "a smiling computer";
                document.getElementById("results_message").innerHTML = "THE COMPUTER WON...";
                loseSound.play();
            } else {
                showPlayerTurnScreen();
            }
        }, 4500);
    }
});