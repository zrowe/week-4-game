var debug = 1

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
    };

    //  Clear all the characters and the redisplay in proper slots 
    function updateGameBoard() {
        if (debug) { console.log("updateGameBoard"); };
        $(".idle-character").hide();
        $(".player-character").hide();
        $(".enemy-character").hide();
        $(".defender-character").hide();
        var idleCount = 0;
        var enemyCount = 0;
        for (i = 0; i < characters.length; i++) {
            paintCharacter(characters[i]);
        }
    };
    // Paint a character intro it's slot
    function paintCharacter(character) {
        if (debug) { console.log("paintCharacter:", character); };

        // TODO:   ****Can't figureout why this is not getting written into DIV ****
        $("#player-character").html('<div class="charname">' + character.name + '</div>' +
            '<img class="thumbnail" src="assets/images/' + character.imageURL +' alt="Alfred-E-Neuman">' +
            '<div class="hitpoints">' = character.currentHealthPoints = '</div>');
        $(".player-character").show();
    };

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
    var playerNotDead = true;

    // Handlers:


    // initialize characters
    $("#reset-button").on("click", function() {
        if (debug) { console.log("reset-button:") };
        for (i = 0; i < characters.length; i++) {
            characters[i].reset(); // reset each character
        }
        attackInProgress = false;
        gameInProgress = false;
        player = null;
        defender = null;
        updateGameBoard();
    });


    // Do stuff when an idle character is clicked
    // when an idle is clicked, it becomes player.  All others become enemy.
    // (no more idles)
    $(".idle-character").on("click", function() {
        if (debug) { console.log("idle Char:", this) };
        // Move this.character to player.
        // TODO:  player = this character from characters object.   
        // Move idle characters to enemy. 
        // change selected chacter to state = player
        // change all other idle charcters to state to enemy
        updateGameBoard();
    });


    // Do stuff when an enemy character is clicked
    // if there are more enemies:
    //  when an enemy is clicked, it becomes defender.  other enemies remain. 
    $(".enemy-character").on("click", function() {
        if (debug) { console.log("enemy-char:", this) };
        if (!attackInProgress) {
            //      reset defender (if set) to enemy
            //      move "this" character to defender
            // set defender global =  char? of defender
            updateGameBoard();
        }
    });


    $("#attack-button").on("click", function() {
        if (debug) { console.log("attack-button:", this) };

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
        // TODO: display proper results banners (Magic Happens).
        
        updateGameBoard();

    });
});