var fishing_line, hook, boat, fishing_line_space = 75, hook_speed = 8,
fishingLRSpace = 147, water, animal, animals, timer, animalTimer, score,
score_text, music, fish_on = false, fish_on_hook, clockTimer, dashed_line, zone_loop = false;

demo.mg_fishing = function() {};
demo.mg_fishing.prototype = {
    preload: function(){
        game.load.image('fishing_line', 'assets/Fishing line.png');
        game.load.image('hook', 'assets/Hook.png');
        game.load.image('boat', 'assets/Boat.png');
        game.load.image('water', 'assets/Water.png');
        game.load.image('report', 'assets/report.png');
        game.load.image('home', 'assets/back button.png');
        game.load.image('fish', 'assets/fish for fishing mg.png');
        game.load.audio('fishing_music', 'assets/fishing music.mp3');
        game.load.audio('water_sound', 'assets/water sound.mp3');
        game.load.audio('adding_sound', 'assets/adding sound.mp3');
        game.load.image('dashed_line', 'assets/Dashed Line.png');
    },
create: function(){
        // enable arcade physics system to use physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        boat = game.add.sprite(centerX, -50, 'boat');
        boat.anchor.setTo(0,0);

        fishing_line = game.add.sprite(boat.x - fishing_line_space, 0, 'fishing_line');
        fishing_line.anchor.setTo(0,0);

        hook = game.add.sprite(boat.x - fishing_line_space, fishing_line.height, 'hook');
        hook.anchor.setTo(.92,0);
        hook.scale.setTo(1, 1);
        game.physics.enable(hook);

        // animal group
        animals = game.add.group();
        animals.enableBody = true;

        // calls addAnimal function every 1 seconds
        addAnimal('fish');
        animalTimer = setInterval(function() { addAnimal('fish'); }, 1000);

        water_sprite = game.add.sprite(0, 0, 'water');
        water_sprite.alpha = 0.5;

        scoreAndTimeSetup("bottom");

        timer = setInterval(function() {second(2); }, 1000);

        clockTimer = setInterval(stopAnimal, 30000);

        cursors = game.input.keyboard.createCursorKeys();

        //music
        music = game.add.audio('fishing_music');
        music.play();

        // water sound
        water_sound = game.add.audio('water_sound');

        // adding sound for fish caught
        adding_sound = game.add.audio('adding_sound');
    },
update: function(){
        if (cursors.up.isDown) {
            if (fishing_line.height - hook_speed <= 0){
                fishing_line.height = 0;
                hook.y = fishing_line.height;
            } else {
                fishing_line.height -= hook_speed;
                hook.y = fishing_line.height;
            }
        } 
        if (cursors.down.isDown) {
            if (hook.y + hook_speed < centerY*2 - hook.height){
                fishing_line.height += hook_speed;
                hook.y = fishing_line.height;
            }
            
        }
        if (cursors.left.isDown) {
            if (boat.x - hook_speed < fishingLRSpace) {
                boat.x = fishingLRSpace;
                fishing_line.x = boat.x - fishing_line_space;
                hook.x = boat.x - fishing_line_space;
            }
            if (fishing_line.x > boat.x - fishing_line_space) {
                if (fishing_line.x - hook_speed < boat.x - fishing_line_space) {
                    fishing_line.x -= fishing_line.x - boat.x - fishing_line_space;
                    hook.x -= fishing_line.x - boat.x - fishing_line_space;
                } else {
                    fishing_line.x -= hook_speed;
                    hook.x -= hook_speed;
                }
            } else {
                boat.x -= hook_speed;
                fishing_line.x -= hook_speed;
                hook.x -= hook_speed;
            }
            hook.scale.setTo(1, 1);
        }
        if (cursors.right.isDown) {
            if (boat.width + boat.x + hook_speed + fishingLRSpace > centerX*2) {
                boat.x = centerX*2 - fishingLRSpace - boat.width;
                fishing_line.x = boat.x + boat.width + fishing_line_space;
                hook.x = boat.x + boat.width + fishing_line_space;
            }
            if (fishing_line.x < boat.x + boat.width + fishing_line_space){
                if (fishing_line.x + hook.speed > boat.x + boat.width + fishing_line_space){
                    fishing_line.x += boat.x + boat.width + fishing_line_space - fishing_line.x;
                    hook.x += boat.x + boat.width + fishing_line_space - fishing_line.x;
                } else {
                    fishing_line.x += hook_speed;
                    hook.x += hook_speed;
                }
            } else {
                boat.x += hook_speed;
                fishing_line.x += hook_speed;
                hook.x += hook_speed;
            }
            hook.scale.setTo(-1, 1);
        }

        // check for hook overlap with fish
        game.physics.arcade.overlap(hook, animals, hookFish, null, this);
        game.physics.arcade.overlap(dashed_line, animals, catchFish, null, this);
    }
}

function scoreAndTimeSetup(location) {
    // create score display
    score = 0;
    score_text = game.add.text(16, centerY*2 - 16, 'Score: ' + score, { fontSize: '30px', fill: '#fff' });
    score_text.anchor.setTo(0,1);
    // pre-set time
    timeInSec = 30;
    if (location == "bottom") {
        timeText = game.add.text(centerX, centerY*2 - 16, '30', { font: '34px Arial', fill: '#fff'} );
        timeText.anchor.setTo(0, 1);
    } else {
        timeText = game.add.text(centerX, 16, '30', { font: '34px Arial', fill: '#fff'} );
        timeText.anchor.setTo(0.5, 0.0);
    }
    timeText.fill = '#ffffff';
}

function second(gameNum) {
    timeInSec -= 1;
    timeString = timeInSec;
    timeText.text = timeString;

    if (timeInSec == 0) {
      //report
        report = game.add.image(centerX, centerY, 'report');
        report.anchor.setTo(0.5, 0.5);
        //info about mg results
        //button
          //
        game.time.events.remove(timer);
        timeText.kill();
        timeText = game.add.text(centerX, 200, 'Results', { font: '65px Arial', fill: '#91f100'} );
        timeText.anchor.setTo(0.5, 0.5);
        score_text.kill();

        if (gameNum == 1) {
            var meat = ((0.75 * score) / 10);
            food += Math.round(meat);
            var deer = ((0.25 * score) / 10);
            clothing += Math.round(deer);
            score_text = game.add.text(centerX, 400, 'Score: ' + score, { fontSize: '45px', fill: '#91f100' });
            score_text.anchor.setTo(0.5, 0.5);
            var meat_text = game.add.text(centerX, 450, 'Food gained: ' + Math.round(meat), {fontSize: '45px', fill: '#91f100'});
            meat_text.anchor.setTo(0.5, 0.5);
            var clothing_text = game.add.text(centerX, 500, 'Clothing gained: ' + Math.round(deer), {fontSize: '45px', fill: '#91f100'});
            clothing_text.anchor.setTo(0.5, 0.5);
            
      }

        else if (gameNum == 2) {
            var fish = ((0.5 * score) / 10);
            food += Math.round(fish);
            var freshwater = ((0.5 * score) / 10);
            water += Math.round(freshwater);
            score_text = game.add.text(centerX, 400, 'Score: ' + score, { fontSize: '45px', fill: '#91f100' });
            score_text.anchor.setTo(0.5, 0.5);
            var fish_text = game.add.text(centerX, 450, 'Food gained: ' + Math.round(fish), {fontSize: '45px', fill: '#91f100'});
            fish_text.anchor.setTo(0.5, 0.5);
            var water_text = game.add.text(centerX, 500, 'Water gained: ' + Math.round(freshwater), {fontSize: '45px', fill: '#91f100'});
            water_text.anchor.setTo(0.5, 0.5);
      }

      else if (gameNum == 3) {
          food_gained = food_mg * 10;
          food += food_gained;
          water_gained = water_mg * 10;
          water += water_gained;
          wood_gained = wood_mg * 10;
          wood += wood_gained;
          cloth_gained = cloth_mg * 10;
          clothing += cloth_gained;
          var fruit_text = game.add.text(centerX, 450, 'Food gained: ' + food_gained, {fontSize: '45px', fill: '#91f100'});
          fruit_text.anchor.setTo(0.5, 0.5);
          var water_text = game.add.text(centerX, 500, 'Water gained: ' + water_gained, {fontSize: '45px', fill: '#91f100'});
          water_text.anchor.setTo(0.5, 0.5);
          var tree_text = game.add.text(centerX, 550, 'Wood gained: ' + wood_gained, {fontSize: '45px', fill: '#91f100'});
          tree_text.anchor.setTo(0.5, 0.5);
          var cotton_text = game.add.text(centerX, 600, 'Clothing gained: ' + cloth_gained, {fontSize: '45px', fill: '#91f100'});
          cotton_text.anchor.setTo(0.5, 0.5);
      }

      else if (gameNum == 4) {
          var tree = (score * 0.5) / 10;
          wood += Math.round(tree);
          var magic_cloth = (score * 0.25) / 10;
          clothing += Math.round(magic_cloth);
          var tree_water = (score * 0.25) / 10;
          water += Math.round(tree_water);
          score_text = game.add.text(centerX, 400, 'Score: ' + score, { fontSize: '45px', fill: '#91f100' });
          score_text.anchor.setTo(0.5, 0.5);
          var tree_text = game.add.text(centerX, 450, 'Wood gained: ' + Math.round(tree), {fontSize: '45px', fill: '#91f100'});
          tree_text.anchor.setTo(0.5, 0.5);
          var sap_text = game.add.text(centerX, 500, 'Clothing gained: ' + Math.round(magic_cloth), {fontSize: '45px', fill: '#91f100'});
          sap_text.anchor.setTo(0.5, 0.5);
          var tree_water_text = game.add.text(centerX, 550, 'Water gained: ' + Math.round(tree_water), {fontSize: '45px', fill: '#91f100'});
          tree_water_text.anchor.setTo(0.5, 0.5);
          

      }
        var mg_1 = game.add.button(centerX, 800, "home", function() {
            clearInterval(clockTimer);  
            minigameCounter -= 1;
            changeScene(null, 1);
      })
        mg_1.anchor.setTo(0.5, 0.5);
    }
}

// adds animal moving from left and right
function addAnimal(type) {
    var leftOrRight = Math.floor(Math.random()*2)
    if (leftOrRight == 0) {
        animal = animals.create(-75,(Math.random() * (centerY-100) * 2) + 200, type);
        animal.anchor.setTo(.5, .5)
        animal.body.gravity.x = Math.random() * 100 + 70;
    } else {
        animal = animals.create(1575,(Math.random() * (centerY-100) * 2) + 200, type);
        animal.anchor.setTo(.5, .5)
        animal.body.gravity.x = Math.random() * 100 * -1 - 70;
    }
    if (type == "fish"){
        if (leftOrRight == 0) {
            animal.scale.setTo(-.15,.15);
        } else {
            animal.scale.setTo(.15,.15);
        }
    } else {
        if (leftOrRight == 0) {
            animal.scale.setTo(1.2,1.2);
        } else {
            animal.scale.setTo(-1.2,1.2);
        }
    }
}

//hook fish when fish overlaps hook
function hookFish(hook, fish) {
    if (!fish_on) {
        water_sound.play();
        dashed_line = game.add.sprite(0, 100, 'dashed_line');
        game.physics.enable(dashed_line);
        fish_on_hook = fish;
        fish_on_hook.scale.setTo(.15,.15);
        fish_on_hook.angle = 90;
        fish_on_hook.body.gravity = 0;
        fish_on_hook.y = hook.y + 3*hook.height/4;
        if (hook.scale.x == 1){
            fish_on_hook.x = hook.x - hook.width * .80;
        } else {
            fish_on_hook.x = hook.x - hook.width * .80;
        }
        fish_on = true;
    } else {
        fish_on_hook.y = hook.y + 3*hook.height/4;
        fish_on_hook.x = hook.x - hook.width * .80;
    }
}

//catching the fish
function catchFish() {
    fish_on_hook.kill();
    dashed_line.kill();
    score += 100;
    score_text.text = "Score: " + score;
    fish_on = false;
    adding_sound.play();
}

// stops and clears animal
function stopAnimal() {
    gameOver = true;
    clearInterval(animalTimer);
    clearInterval(timer);
    animals.kill();
    if (cursor_target != undefined) {
        cursor_target.kill();
    }
    music.pause();
    fish_on = false;
}