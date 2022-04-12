var water_mg, wood_mg, cloth_mg, food_mg;

demo.mg_gathering = function() {};
demo.mg_gathering.prototype = {
    preload: function(){
        game.load.image('bucket', 'assets/basket for gathering mg.png');
        game.load.image('report', 'assets/report.png');
        game.load.image('home', 'assets/back button.png');
        game.load.image('rain', 'assets/rain.png');   
        game.load.image('cotton', 'assets/cotton.png');
        game.load.image('silk', 'assets/silk.png');    
        game.load.image('apple', 'assets/apple.png'); 
        game.load.image('orange', 'assets/orange.png'); 
        game.load.image('banana', 'assets/banana.png'); 
        game.load.image('branch', 'assets/branch.png'); 
        game.load.image('log', 'assets/log.png');      
        game.load.image('bomb', 'assets/bomb.png');    
        game.load.audio('fishing_music', 'assets/fishing music.mp3');
        game.load.audio('adding_sound', 'assets/adding sound.mp3');
        game.load.audio('losing_sound', 'assets/losing tone.mp3');
    },
create: function(){
        // enable arcade physics system to use physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        water_mg = 0;
        wood_mg = 0;
        cloth_mg = 0;
        food_mg = 0;

        bucket = game.add.sprite(centerX, centerY, 'bucket');
        bucket.scale.setTo(.5, .5);
        game.physics.enable(bucket);
        bucket.body.collideWorldBounds = true;

        // fruit group
        fruit = game.add.group();
        fruit.enableBody = true;

        // water group
        rain = game.add.group();
        rain.enableBody = true;

        // cloth group
        cloth = game.add.group();
        cloth.enableBody = true;

        // wood group
        log = game.add.group();
        log.enableBody = true;

        //bomb group
        bomb = game.add.group();
        bomb.enableBody = true;

        // calls addAnimal function every 1 seconds
        addResource('apple');
        resourceTimer = setInterval(function() { addResource('apple'); }, 1000);

        scoreAndTimeSetup("top");

        timer = setInterval(function() {second(3); }, 1000);

        clockTimer = setInterval(stopResource, 30000);

        cursors = game.input.keyboard.createCursorKeys();

        //music
        music = game.add.audio('fishing_music');
        music.play();

        // water sound
        water_sound = game.add.audio('water_sound');

        // losing sound for contact with bomb
        losing_sound = game.add.audio('losing_sound');

        // adding sound for fish caught
        adding_sound = game.add.audio('adding_sound');

        score_text.kill();

        resource1 = game.add.text(0, 950, 'Food', {fontSize: '45px', fill: '#fff'});
        resource2 = game.add.text(205, 950, 'Water', {fontSize: '45px', fill: '#fff'});
        resource3 = game.add.text(405, 950, 'Clothing', {fontSize: '45px', fill: '#fff'});
        resource4 = game.add.text(675, 950, 'Wood', {fontSize: '45px', fill: '#fff'});

        numFood = game.add.text(40, 905, food_mg.toString(), {fontSize: '45px', fill: '#fff'});
        numWater = game.add.text(255, 905, water_mg.toString(), {fontSize: '45px', fill: '#fff'});
        numClothing = game.add.text(485, 905, cloth_mg.toString(), {fontSize: '45px', fill: '#fff'});
        numWood = game.add.text(730, 905, wood_mg.toString(), {fontSize: '45px', fill: '#fff'});
    },
update: function(){
        bucket.body.velocity.x = 0;
        bucket.body.velocity.y = 0;

      // moves target with arrow keys
        if (cursors.left.isDown) {
            bucket.body.velocity.x = -400;
        }
        if (cursors.right.isDown) {
            bucket.body.velocity.x = 400;
        }
        if (cursors.up.isDown) {
            bucket.body.velocity.y = -400;
        } 
        if (cursors.down.isDown) {
            bucket.body.velocity.y = 400;
        }

        // check for bucket overlap with fruit
        game.physics.arcade.overlap(bucket, fruit, catchResource, null, this);

        // check for bucket overlap with fruit
        game.physics.arcade.overlap(bucket, rain, catchResource, null, this);

        // check for bucket overlap with fruit
        game.physics.arcade.overlap(bucket, cloth, catchResource, null, this);

        // check for bucket overlap with fruit
        game.physics.arcade.overlap(bucket, log, catchResource, null, this);

        // check for bucket overlap with bomb
        game.physics.arcade.overlap(bucket, bomb, catchResource, null, this);

        numFood.text = food_mg.toString();
        numWater.text = water_mg.toString();
        numClothing.text = cloth_mg.toString();
        numWood.text = wood_mg.toString();
    }
}

// adds fruit moving from left and right
function addResource(type) {
    var resourceType = Math.ceil(Math.random()*5)
    if (resourceType == 1) {
        var fruitList = ['apple', 'banana', 'orange'];
        var fruitType = fruitList[Math.floor(Math.random()*3)];
        resource = fruit.create((Math.random() * game.width), -150, fruitType);
        if (fruitType == 'apple'){
            resource.scale.setTo(.6,.6);
        } else if (fruitType == 'orange'){
            resource.scale.setTo(.1,.1);
        } else {
            resource.scale.setTo(.25,.25);
        }
    } else if (resourceType == 2) {
        resource = rain.create((Math.random() * game.width), -150, 'rain');
        resource.scale.setTo(.2,.2);
    } else if (resourceType == 3) {
        var clothList = ['cotton', 'silk'];
        var clothType = clothList[Math.floor(Math.random()*2)];
        resource = cloth.create((Math.random() * game.width), -150, clothType);
        if (clothType == 'cotton'){
            resource.scale.setTo(.2,.2);
        } else {
            resource.scale.setTo(.7,.7);
        }
    } else if (resourceType == 4) {
        var woodList = ['branch', 'log'];
        var woodType = woodList[Math.floor(Math.random()*2)];
        resource = log.create((Math.random() * game.width), -150, woodType);
        if (woodType == 'log'){
            resource.scale.setTo(.2,.2);
        } else {
            resource.scale.setTo(.2,.2);
        }
    } else {
        resource = bomb.create((Math.random() * game.width), -150, 'bomb');
        resource.scale.setTo(.5,.5);
    }

    if (game.width - resource.body.x < resource.width) {
        console.log(resource);
        var leftPush = resource.width - (game.width - resource.body.x);
        resource.x -= leftPush;
    }
    resource.body.gravity.y = Math.random() * 100 + 70;
}

function catchResource(bucket, resource){
    if (resource.y + resource.height < bucket.y + (.1*bucket.height)){
        if (['apple', 'banana', 'orange'].includes(resource.key)){
            food_mg += 1;
            adding_sound.play();
        } else if (['cotton', 'silk'].includes(resource.key)){
            cloth_mg += 1;
            adding_sound.play();
        } else if (['branch', 'log'].includes(resource.key)) {
            wood_mg += 1;
            adding_sound.play();
        } else if (['rain'].includes(resource.key)){
            water_mg += 1;
            adding_sound.play();
        } else {
            losing_sound.play();
            if (food_mg != 0) {
                food_mg -= 1;
            }
            if (cloth_mg != 0) {
                cloth_mg -= 1;
            }
            if (wood_mg != 0) {
                wood_mg -= 1;
            }
            if (water_mg != 0){
                water_mg -= 1;
            }
        }
        resource.kill();
    }
    
}

// stops and clears resources
function stopResource() {
    gameOver = true;
    clearInterval(resourceTimer);
    clearInterval(timer);
    bucket.kill();
    fruit.kill();
    rain.kill();
    cloth.kill();
    log.kill();
    bomb.kill();
    music.pause();
}