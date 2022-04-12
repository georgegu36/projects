var chops, upNextChopped = -1;

demo.mg_logging = function() {};
demo.mg_logging.prototype = {
    preload: function(){
        game.load.audio('chopping_sound', 'assets/adding sound.mp3');
        game.load.audio('fishing_music', 'assets/fishing music.mp3');
        game.load.image('report', 'assets/report.png');
        game.load.image('home', 'assets/back button.png');
        game.load.image('woods', 'assets/loggingBG.png');
        game.load.spritesheet('chop', 'assets/tree chopping.png', 135, 135);
        game.load.spritesheet('axe', 'assets/axe for chopping.png', 500, 500); 
    },
create: function(){
        // enable arcade physics system to use physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        var bg = game.add.sprite(0, 0, 'woods');
        bg.alpha = .3;

        axe = game.add.sprite(centerX, centerY, 'axe');
        axe.scale.setTo(.3, .3);
        game.physics.enable(axe);
        axe.body.collideWorldBounds = true;
        axe.animations.add('axeStrike', [1, 0]);

        chops = game.add.group();
        chops.enableBody = true;

        upNextChopped = -1;

        // calls addChopZone function every 1 seconds
        addChopZone();
        chopZoneTimer = setInterval(addChopZone, 900);
        noHitTimer = setInterval(function() {removeChopZone('no hit'); }, 1800)

        scoreAndTimeSetup("top");

        timer = setInterval(function() {second(4); }, 1000);

        clockTimer = setInterval(stopLogging, 30000);

        cursors = game.input.keyboard.createCursorKeys();

        // music
        music = game.add.audio('fishing_music');
        music.play();

        // adding sound for tree chopped
        chopping_sound = game.add.audio('chopping_sound');
    },
update: function(){
        axe.body.velocity.x = 0;
        axe.body.velocity.y = 0;

      // moves target with arrow keys
        if (cursors.left.isDown) {
            axe.body.velocity.x = -600;
        }
        if (cursors.right.isDown) {
            axe.body.velocity.x = 600;
        }
        if (cursors.up.isDown) {
            axe.body.velocity.y = -600;
        } 
        if (cursors.down.isDown) {
            axe.body.velocity.y = 600;
        }

        game.input.keyboard.onUpCallback = function( e ){
            if(e.keyCode == Phaser.Keyboard.SPACEBAR){
                game.physics.arcade.overlap(axe, chops, chopped, null, this);
                axe.animations.play('axeStrike', 3, false);
            }
        }
    }
}

function chopped(axe, tree) {
    if (((tree.y + tree.height > axe.y && tree.y + tree.height < axe.y + (.4*axe.height)) 
    || (tree.y > axe.y && (tree.y < axe.y + (.4*axe.height))) 
    || (tree.y < axe.y && (tree.y + tree.height > axe.y + (.4*axe.height)))) 
    && ((tree.x + tree.width > axe.x + (.6*axe.width) && tree.x + tree.width < axe.x + axe.width) 
    || (tree.x > axe.x + (.6*axe.width) && (tree.x < axe.x + axe.width)) 
    || (tree.x < axe.x + (.6*axe.width) && (tree.x + tree.width > axe.x + axe.width))))
    {
        tree.animations.play('strike', 200, true);
        tree.body = null;
        chopping_sound.play();
        score += 100;
        score_text.text = "Score: " + score;
        choppedTimer = setTimeout(function() { removeChopZone(tree); }, 500);
    }
}

function removeChopZone(chopZone) {
    if (chopZone == 'no hit') {
        upNextChopped += 1;
        if (chops.children[upNextChopped].alive == true) {
            chops.children[upNextChopped].kill();
        }
    } else {
        chopZone.kill();
    }
}

function addChopZone() {
    chopZone = chops.create((Math.random() * (game.width - 135)), (Math.random() * (game.height - 135)), 'chop');
    chopZone.animations.add('strike', [1]);
}

// stops and clears resources
function stopLogging() {
    axe.kill();
    chops.kill();
    music.pause();
    clearInterval(chopZoneTimer);
    clearInterval(noHitTimer);
    clearInterval(timer);
    music.kill();
}