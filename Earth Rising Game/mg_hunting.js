var cursor_target;
var cursors;
var timeInSec;
var timeText = '';
var timeString;
var gameOver = false;

demo.mg_hunting = function() {};
demo.mg_hunting.prototype = {
  preload: function(){
      game.load.image('woods', 'assets/woods background.png');
      game.load.image('deer', 'assets/deer for hunting.png');
      game.load.image('cursor_target', 'assets/cursor target.png');
      game.load.audio('gun_shot', 'assets/gun shot.mp3');
      game.load.audio('hunting_music', 'assets/hunting music.mp3');
      game.load.image('report', 'assets/report.png');
      
      game.load.image('home', 'assets/back button.png');
  },
  create: function(){
      // enable arcade physics system to use physics
      game.physics.startSystem(Phaser.Physics.ARCADE);

      // background
      game.add.sprite(0, 0, 'woods');

      // deer group
      animals = game.add.group();
      animals.enableBody = true;

      // calls addAnimal function every 1 seconds
      addAnimal('deer');
      animalTimer = setInterval(function() { addAnimal('deer'); }, 1000);

      // cursor target
      cursor_target = game.add.sprite(centerX - 25, centerY - 25, 'cursor_target');

      // enable physics on cursor target
      game.physics.arcade.enable(cursor_target);

      cursor_target.body.collideWorldBounds = true;

      cursors = game.input.keyboard.createCursorKeys();

      scoreAndTimeSetup("bottom");
  
      timer = setInterval(function() {second(1); }, 1000);

      // stop creating deer after 30 seconds
      clockTimer = setInterval(stopAnimal, 30000);

      // gun shot
      gun_shot = game.add.audio('gun_shot');

      // hunting music
      music = game.add.audio('hunting_music');
      music.play();


    },
  update: function(){
    cursor_target.body.velocity.x = 0;
    cursor_target.body.velocity.y = 0;

      // moves target with arrow keys
    if (cursors.left.isDown) {
      cursor_target.body.velocity.x = -400;
    }
    if (cursors.right.isDown) {
      cursor_target.body.velocity.x = 400;
    }
    if (cursors.up.isDown) {
      cursor_target.body.velocity.y = -400;
    } 
    if (cursors.down.isDown) {
      cursor_target.body.velocity.y = 400;
    }

      // check for overlap with deer
    game.input.keyboard.onUpCallback = function( e ){
      if(e.keyCode == Phaser.Keyboard.SPACEBAR && gameOver != true){
        gun_shot.play();
      }
    }
      //spaceKey.onUp(shootDeer, this);

    game.physics.arcade.overlap(cursor_target, animals, shootDeer, null, this);
  }
}

// kills deer when spacebar is pressed once
function shootDeer (cursor_target, deer) {
  game.input.keyboard.onUpCallback = function( e ){
    if(e.keyCode == Phaser.Keyboard.SPACEBAR){
      gun_shot.play();
      deer.kill();
      score += 100;
      score_text.text = 'Score: ' + score;
    }
  }
}