$(document).ready(function() {

    // Blueprint for a character
    function Character(name, state, baseHealthPoints,
        baseAttackPower, counterAttackPower, imageURL,
        currentHealthPoints, currentAttackPower) {
        this.name = name;
        this.state = state; // idle, enemy, player, defender, dead
        this.imageURL = imageURL;
        this.baseHealthPoints = baseHealthPoints; //constant
        this.baseAttackPower = baseAttackPower; // constant
        this.counterAttackPower = counterAttackPower; // constant

        this.currentHealthPoints = currentHealthPoints; // maintained by reset function
        this.currentAttackPower = currentAttackPower; // maintained by reset function
        this.reset = function() {
            this.currentHealthPoints = this.baseHealthPoints;
            this.currentAttackPower = this.baseAttackPower;
            this.state = "idle";
            console.log(this);
        };
    }

    // load the characters
    var charA = new Character("Alfred", "Idle", 100, 25, 10, "alfred.jpg");
    var charB = new Character("Sam", "Idle", 150, 5, 5, "alfred.jpg");
    var charC = new Character("Jack", "Idle", 200, 15, 5, "alfred.jpg");
    var charD = new Character("Bill", "Idle", 250, 20, 10, "alfred.jpg");

    // gather all the characters together
    var characters = [charA, charB, charC, charD];

    // reset all the characters
    for (i = 0; i < characters.length; i++) {
        characters[i].reset();
    }

    var player; // handle if current player
    var defender; // handle of current defender
    var attackInProgress = false; // set during a player/defender action.
    var gameInProgress = false;

    // Handlers:

    // Do stuff when the reset button is pressed
    // Reset: 	set all to idle
    //				 	set currentHealthPoints = baseHealthPoints
    //					set currentAttackPoints = baseAttackPoints 
    // 					set gameIdle -- indicate initial state


    $("reset-button").on("click", function() {
        // initialize characters
        //			set current values to base values
        //			set state to idle
        // initialize display

        //  characters.foreach  rather use foreach.
        for (i = 0; i < characters.length; i++) {
            i.reset();
        }
        attackInProgress = false;
    });


    // Do stuff when an idle character is clicked
    // when an idle is clicked, it becomes player.  All others become enemy.
    // (no more idles)
    $("idle-char").on("click", function() {
        // Move this.character to player.
        // Move idle characters to enemy. 
    });


    // Do stuff when an enemy character is clicked
    // if there are more enemies:
    // 	when an enemy is clicked, it becomes defender.  other enemies remain. 
    $("enemy-char").on("click", function() {
        if (!attackInProgress) {
            // 		reset defender (if set) to enemy
            //		move "this" character to defender
        }
    });


    $("attack-button").on("click", function() {

        attackInProgress = true; // inhibit enemy selection

        while ((player.currentHealthPoints > 0) && (defender.currentHealthPoints > 0)) {
            defender.currentHealthPoints -= player.currentAttackPower; // Attack!
            player.currentAttackPower += player.baseAttackPower; // Increase for next attack
            if (defender.currentHealthPoints <= 0) {
                defender.state = "dead"; // Defender is dead!
            } else {
                player.currentHealthPoints -= defender.currentAttackPower;
                if (player.currentHealthPoints <= 0) {
                    player.state = "dead";
                }
            }
        }
        // action results of the battle
    });
});