var demo = {}, day = 1, dayText, centerX = 1500 / 2, centerY = 1000 / 2, humans, food = 0, clothing = 0, water = 0, wood = 0, minigameCounter = 1,
foodNeeded = 0, waterNeeded = 0, clothNeeded = 0, woodNeeded = 0, population = 100, foodUsed = 0, waterUsed = 0, clothUsed = 0, woodUsed = 0, foodNeeded = 0,
waterNeeded = 0, clothNeeded = 0, woodNeeded = 0;
demo.story = function() {};
demo.story.prototype = {
  preload: function(){
    game.load.image('day_page', 'assets/population progress images/before population progress.png');
    game.load.image('selection', 'assets/sword for survival tasks.png', 100, 100);
    game.load.image('need', 'assets/chest for resources needed.png', 100, 100);
    game.load.image('dayOver100_page', 'assets/population progress images/population progress 0.png');
    game.load.image('day200_page', 'assets/population progress images/population progress 1.png');
    game.load.image('day400_page', 'assets/population progress images/population progress 2.png');
    game.load.image('day600_page', 'assets/population progress images/population progress 3.png');
    game.load.image('day800_page', 'assets/population progress images/population progress final.png');

    // game.load.image('logging', 'assets/logging.jpeg', 100, 100);
  },
  create: function(){
      addChangeSceneEventListener();

      if (population >= 800) {
        game.add.sprite(0, 0, 'day800_page');
      }

      else if (population >= 600) {
          game.add.sprite(0, 0, 'day600_page');
      }

      else if (population >= 400) {
          game.add.sprite(0, 0, 'day400_page');
      }

      else if (population >= 200) {
          game.add.sprite(0, 0, 'day200_page');
      }
      else if (population > 100) {
          game.add.sprite(0, 0, 'dayOver100_page');
      }
      else {
          game.add.sprite(0, 0, 'day_page');
      }

      dayText = game.add.text(centerX - 80, 15, 'Day: '  + day, { fontSize: '50px', fill: '#fff' });
      miniCounter = game.add.text(0, 15, 'Tasks Left: ' + minigameCounter, { fontSize: '50px', fill: '#fff'});

      var selection = game.add.button(1200, 700, "selection", function() {
        game.state.start('minigame_selection_page');
      })

      resources_needed = game.add.button(1200, 500, 'need', function(){
            changeScene(null, 5);
      })

      resource1 = game.add.text(0, 950, 'Food', {fontSize: '45px', fill: '#fff'});
      resource2 = game.add.text(205, 950, 'Water', {fontSize: '45px', fill: '#fff'});
      resource3 = game.add.text(405, 950, 'Clothing', {fontSize: '45px', fill: '#fff'});
      resource4 = game.add.text(675, 950, 'Wood', {fontSize: '45px', fill: '#fff'});

      numFood = game.add.text(40, 905, food.toString(), {fontSize: '45px', fill: '#fff'});
      numWater = game.add.text(255, 905, water.toString(), {fontSize: '45px', fill: '#fff'});
      numClothing = game.add.text(485, 905, clothing.toString(), {fontSize: '45px', fill: '#fff'});
      numWood = game.add.text(730, 905, wood.toString(), {fontSize: '45px', fill: '#fff'});

      population_text = game.add.text(1000, 15, 'Population: ' + population, {fontSize: '45px', fill: '#fff'});
  },
  update: function(){}
}

function changeScene(i, sceneNum){
    if (sceneNum == 1) {
        if (minigameCounter == 0) {
            console.log('day recap');
            dayText = "Day: " + day;
            game.state.start('day_recap');
        }
        else {
            console.log('story');
            dayText = "Day: " + day;
            game.state.start('story');
        }
    }
    if (sceneNum == 2) {
        console.log('mg_hunting');
        game.state.start('mg_hunting');
    }
    if (sceneNum == 3) {
        console.log('mg_fishing');
        game.state.start('mg_fishing');
    }
    if (sceneNum == 4) {
        console.log('mg_gathering');
        game.state.start('mg_gathering');
    }
    
    if (sceneNum == 5) {
        console.log('resources_needed');
        game.state.start('resources_needed');
    }

    if (sceneNum == 6) {
        console.log('game_over');
        game.state.start('game_over');
    }
}

function addKeyCallback(key, fn, args){
    game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);
}

function addChangeSceneEventListener(){
    addKeyCallback(Phaser.Keyboard.ONE, changeScene, 1);
    addKeyCallback(Phaser.Keyboard.TWO, changeScene, 2);
}

function checkPopulation(){
    if (population <= 0 || population >= 1000) {
        changeScene(null, 6);
    }
    else if (population < 100) {
        minigameCounter = 1;
    }
    else {
        minigameCounter = Math.floor(population / 100);
    }
}

function addPopulation() {
    var leftovers = 0;
    if (food > 0 && foodNeeded > 0) {
        leftovers += food;
        foodUsed = food;
        food = 0;
    }
    else {
        foodUsed = 0;
    }

    if (water > 0 && waterNeeded > 0) {
        leftovers += water;
        waterUsed = water;
        water = 0;
    }

    else {
        waterUsed = 0;
    }

    if (clothing > 0 && clothNeeded > 0) {
        leftovers += clothing;
        clothUsed = clothing;
        clothing = 0;
    }

    else {
        clothUsed = 0;
    }

    if (wood > 0 && woodNeeded > 0) {
        leftovers += wood;
        woodUsed = wood;
        wood = 0;
    }
    else {
        woodUsed = 0;
    }
    population += leftovers;
    game.add.text(centerX - 300, 0, 'Click next to go to the next day!', { fontSize: '50px', fill: '#fff' });
    game.add.text(centerX - 700, 900, foodUsed + ' food, ' + waterUsed + ' water, ' + clothUsed + ' cloth, and ' + woodUsed + ' wood add ' + leftovers + ' to the population.', { fontSize: '45px', fill: '#fff' });
    game.add.text(centerX - 150, 950, 'New population: ' + population, { fontSize: '50px', fill: '#fff' });
}

function decreasePopulation(lack_food, lack_water, lack_clothing, lack_wood){
    var resources_lacking = 0;
    if (lack_food > 0){
      	resources_lacking += lack_food;
    }
	if (lack_water > 0){
		resources_lacking += lack_water;
	}
	if (lack_clothing >0){
		resources_lacking +=lack_clothing;
	}
	if (lack_wood>0){
		resources_lacking += lack_wood;
	}
    if (population < resources_lacking) {
        pop_left = population;
        population -= pop_left;
        game.add.text(centerX -400, 700, pop_left + ' people in your civilization have died', { fontSize: '50px', fill: '#fff' });
    }
    else {
        population -= resources_lacking;
        game.add.text(centerX -400, 700, resources_lacking + ' people in your civilization have died', { fontSize: '50px', fill: '#fff' });
    }
    
    
}



