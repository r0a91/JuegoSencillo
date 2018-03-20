var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('damage', 'assets/Damage.png');
    game.load.image('health', 'assets/Health.png');
    game.load.image('player', 'assets/Player.png');
    game.load.image('point', 'assets/Point.png');
}

//game variables
var p1;
var cursors
var score = 0
var textscore
var lifes = 3
var textlifes
var stateText
//colision groups
var points
var damages
var healts





function create() {

    //player configuration
    p1 = game.add.sprite(420, 530, 'player');
    p1.anchor.set(0.5);

    game.physics.arcade.enable(p1);
    
    p1.body.drag.set(200);
    p1.body.maxVelocity.set(500);

    //groups

    points = game.add.group();
    damages = game.add.group();
    healts = game.add.group();

    points.createMultiple(250, 'point', 0, false);
    damages.createMultiple(200, 'damage', 0, false);
    healts.createMultiple(50, 'health', 0, false);

    //physics
    game.physics.arcade.gravity.y = 400;
    game.physics.arcade.enable(game.world, true);

    
    p1.body.allowGravity = 0;

    //items creation

    game.time.events.loop(400, firePoints, this);
    game.time.events.loop(500, fireDamages, this);
    game.time.events.loop(1200, fireHealths, this);



    //text on screen
    textscore = game.add.text(0, 0, "score:", { font: "32px Arial", fill: "#ffffff", align: "center" });
    textlifes = game.add.text(200, 0, "Lifes:", { font: "32px Arial", fill: "#36f948", align: "center" });
    stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;


    //cursors keys
    cursors = this.input.keyboard.createCursorKeys();

}

function firePoints() {

    var point = points.getFirstExists(false);

    if (point)
    {
        point.exists = true;
        point.reset(game.world.randomX, 0);
    }

}

function fireDamages() {

    var damage = damages.getFirstExists(false);

    if (damage)
    {
        damage.exists = true;
        damage.reset(game.world.randomX, 0);
    }

}

function fireHealths() {

    var healt = healts.getFirstExists(false);

    if (healt)
    {
        healt.exists = true;
        healt.reset(game.world.randomX, 0);
    }

}

function update() {

    textscore.text = "Score: " + score;
    textlifes.text = "Lifes: " + lifes;


    game.physics.arcade.overlap(p1, points, colisionPoints, null, this);
    game.physics.arcade.overlap(p1, healts, colisionHealts, null, this);
    game.physics.arcade.overlap(p1, damages, colisionDamages, null, this);
  

    if (cursors.left.isDown)
    {   
        p1.body.acceleration.set(-500, 0);
        //p1.body.angularVelocity = -300;
    }
    else if (cursors.right.isDown)
    {   
        p1.body.acceleration.set(500, 0);
        //p1.body.angularVelocity = 300;
    }
    else
    {
        p1.body.acceleration.set(0);
    }

    game.world.wrap(p1, 16);
}

function colisionPoints(player, point) {
    point.kill();
    score = score + 1
}
function colisionHealts(player, healt) {
    healt.kill();
    lifes = lifes + 1
}
function colisionDamages(player, damage) {
    damage.kill();
    lifes = lifes - 1

    if (lifes < 1)
    {
        player.kill();

        stateText.text=" GAME OVER";
        stateText.visible = true;


    }
}