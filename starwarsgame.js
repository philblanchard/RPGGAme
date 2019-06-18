	var characterSelection = [];
	var character = null;
	var defender = null;
    var defenders = [];
    var hasHumanPicked = false;
    var hasHumanPickedOpponent = false;


    function characterTemplate(name, hp, ap, counter, img) {
        this.id
        this.name = name;
        this.healthPoints = hp;
        this.attackPower = ap;
        this.baseAttack = ap;
        this.counterAttackPower = counter;
        this.img = img;
    };

    function createCharacters() {
        var luke = new characterTemplate("Luke Skywalker", 90, 10, 5, "https://img.maximummedia.ie/joe_ie/eyJkYXRhIjoie1widXJsXCI6XCJodHRwOlxcXC9cXFwvbWVkaWEtam9lLm1heGltdW1tZWRpYS5pZS5zMy5hbWF6b25hd3MuY29tXFxcL3dwLWNvbnRlbnRcXFwvdXBsb2Fkc1xcXC8yMDE0XFxcLzA3XFxcL2x1a2Vza3l3YWxrZXIuanBnXCIsXCJ3aWR0aFwiOjc2NyxcImhlaWdodFwiOjQzMSxcImRlZmF1bHRcIjpcImh0dHBzOlxcXC9cXFwvd3d3LmpvZS5pZVxcXC9hc3NldHNcXFwvaW1hZ2VzXFxcL2pvZVxcXC9uby1pbWFnZS5wbmc_aWQ9MjY0YTJkYmUzNzBmMmM2NzVmY2RcIixcIm9wdGlvbnNcIjpbXX0iLCJoYXNoIjoiMzY5YzZiNDMzMDUxZGQzMmU5MjgzNmY2MGIxMWQ4ZWQzMjQ4YzllMCJ9/lukeskywalker.jpg");
        var darthVader = new characterTemplate("Darth Vader", 120, 15, 10, "https://s.abcnews.com/images/Entertainment/HT_darth_vader_jef_160715_16x9_992.jpg");
        var obiWanKenobi = new characterTemplate("Yoda", 100, 5, 20, "https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Yoda_Empire_Strikes_Back.png/220px-Yoda_Empire_Strikes_Back.png");
        var jarJar = new characterTemplate("Jar Jar Binks", 10, 1, 1, "https://vignette.wikia.nocookie.net/starwars/images/0/02/Jar_Jar_SWSB.png/revision/latest?cb=20160910034613");
        characterSelection.push(luke, darthVader, obiWanKenobi, jarJar);
    };

    function increaseAttackPower(fighter){
        fighter.attackPower+= fighter.baseAttack;
    };

    function startGame() {
        createCharacters();
    };

    function drawCombatants() {
        $(".alert").empty();
        var attacker = $('<div class="card" id="attacker'+ 0 +'" style="max-width: 45%;max-height: 55%;"><img src="' + character.img + '" class="card-img-top img-thumbnail" style="height: 500px; width: 800px;object-fit: contain;"><div class="card-body"><h5 class="card-title">'+character.name+'</h5><p id="yourHP">HP: '+character.healthPoints + '<br> AP: ' + character.attackPower + '</p></div></div>');
        var attackButton = $('<div class="card" style="max-width: 10%;"><h5 class="card-title">VS.</h5><button type="button" class="btn btn-primary">Attack!</button></div>');
        var defendingEnemy = $('<div class="card" id="attacker'+ 0 +'" style="max-width: 45%;max-height: 25%;"><img src="' + defender.img + '" class="card-img-top img-thumbnail" style="height: 500px; width: 800px; object-fit: contain;"><div class="card-body"><h5 class="card-title">'+defender.name+'</h5><p><p id="defenderHP">HP: '+defender.healthPoints + '<br> Counter Power: ' + defender.counterAttackPower + '</p></p></div></div>');
        $("#instructions").text('Press the "Attack!" button to attack your enemy! They will strike back with their counter attack! Attacks against your enemy increase your Attack Power.');
        $("#characterCards").append(attacker);
        $("#characterCards").append(attackButton);
        $("#characterCards").append(defendingEnemy);
        
        attackTime();
    };

    function isGameOver() {
        if (character.healthPoints <= 0 ){
            $("#characterCards").empty();
            $("#display").html("<marquee>GAME OVER</marquee>");
            $("#instructions").text('You have died :(');
        }
        else if (defender.healthPoints <= 0 && characterSelection.length > 0){
            $("#characterCards").empty();
            hasHumanPickedOpponent = false;
            drawCharacterCards();
            $("#instructions").text(defender.name + ' has been defeated! ' + character.name + ', select a new opponent!');
            $("button").click(function(){
                console.log('pressed');
                var choice = ($(this).attr("data"));
                fighterSelect(choice);
            })
        }
        else if (characterSelection.length === 0){
            $("#characterCards").empty();
            $("#display").html("<marquee>You Won!</marquee>");
            $("#instructions").text('Congratulations!');
        }
    }

    function attackTime() {
        $("button").click(function(){
            defender.healthPoints = defender.healthPoints - character.attackPower;
            character.healthPoints = character.healthPoints - defender.counterAttackPower;
            $("#instructions").text(character.name + ' attacks ' + defender.name + ' for ' + character.attackPower + ' damage. ' + defender.name + ' strikes back for ' + defender.counterAttackPower + ' damage.');
            increaseAttackPower(character);
            $("#yourHP").html('HP: '+character.healthPoints + '<br> AP: ' + character.attackPower );
            $("#defenderHP").html('HP: ' + defender.healthPoints + '<br> Counter Power: ' + defender.counterAttackPower );
            isGameOver();
        });
    }

    function drawCharacterCards() {
        for (a in characterSelection){
        var newCharCard = $('<div class="card" id="'+a+'" style="max-width: 33%;max-height: 25%;"><img src="' + characterSelection[a].img + '" class="card-img-top img-thumbnail" style="max-width: 1000%;height: 50%;"><div class="card-body"><h5 class="card-title">'+characterSelection[a].name+'</h5><p></p><button type="button" class="btn btn-primary" id="btn-'+a+'" data="'+a+'">Select</button></div></div>');
        $("#characterCards").append(newCharCard)
        };
    };

    function fighterSelect(c){
        if (!hasHumanPicked && !hasHumanPickedOpponent){
            character = characterSelection[c];
            characterSelection.splice(c,1);
            $("#" + c).addClass("bg-success");
            console.log('btn-'+c)
            $("#btn-"+c).attr("disabled", true);
            hasHumanPicked = true;
            console.log('this is your choice: ' + character);
            console.log('and this is the ')
            
            $("#instructions").text('Now, '+character.name + ', select Your Opponent!');
            $("#characterCards").empty();
            drawCharacterCards();
            $("button").click(function(){
                var choice = ($(this).attr("data"));
                fighterSelect(choice);
            });
        }

        else if (hasHumanPicked && hasHumanPickedOpponent===false){
            console.log('ouuu are here');
            hasHumanPickedOpponent = true;
            defender = characterSelection[c];
            $("#" + c).addClass("bg-danger");
            $("#btn-"+c).attr("disabled", true);
            console.log(defender);
            characterSelection.splice(c,1);
            $("#characterCards").empty();
            drawCombatants();
        }
    }

startGame();
drawCharacterCards();
addEventListener();

function addEventListener(){
$("button").click(function(){
    console.log('pressed');
    var choice = ($(this).attr("data"));
    fighterSelect(choice);
})};
