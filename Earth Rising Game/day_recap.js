demo.day_recap = function() {};
demo.day_recap.prototype = {
    preload: function() {
        game.load.image('day_page', 'assets/day page.png');
        game.load.image('next_button', 'assets/next button.png');
    },
    create: function() {
        game.add.sprite(0, 0, 'day_page');

        addChangeSceneEventListener();
        game.add.text(centerX -150, 650, 'Food Needed: ' + foodNeeded, { fontSize: '50px', fill: '#fff' });
        game.add.text(centerX -150, 600, 'Water Needed: ' + waterNeeded, { fontSize: '50px', fill: '#fff' });
        game.add.text(centerX -150, 550, 'Cloth Needed: ' + clothNeeded, { fontSize: '50px', fill: '#fff' });
        game.add.text(centerX -150, 500, 'Wood Needed: ' + woodNeeded, { fontSize: '50px', fill: '#fff' });
        game.add.text(centerX -150, 450, 'Food Collected: ' + food, { fontSize: '50px', fill: '#fff' });
        game.add.text(centerX -150, 400, 'Water Collected: ' + water, { fontSize: '50px', fill: '#fff' });
        game.add.text(centerX -150, 350, 'Clothing Collected: ' + clothing, { fontSize: '50px', fill: '#fff' });
        game.add.text(centerX -150, 300, 'Wood Collected: ' + wood, { fontSize: '50px', fill: '#fff' });

        if (population < 200) {
            
            if (food < 30 || water < 30) {
                decreasePopulation(foodNeeded - food, waterNeeded - water, 0, 0);
				
                game.add.text(centerX - 300, 0, 'Click next to go to the next day!', { fontSize: '50px', fill: '#fff' });
                food = 0;
                water = 0;
				clothing = 0;
				wood=0;
				
                minigameCounter = 1;
                day += 1;
            }

            else {
                food -= 30;
                water -= 30;
                addPopulation();
                if (population < 200) {
                    minigameCounter = 1;
                }

                else {
                    minigameCounter = 2;
                }
                day += 1;
            }
            }
        

        else if (population < 300) {

            if (clothing < 50 || wood < 50) {
                decreasePopulation(0, 0, clothNeeded - clothing, woodNeeded - wood);
        
                game.add.text(centerX - 300, 0, 'Click next to go to the next day!', { fontSize: '50px', fill: '#fff' });
				food = 0;
                water = 0;
                clothing = 0;
                wood = 0;
                minigameCounter = Math.floor(population / 100);
                day += 1;
            }

            else {
                clothing -= 50;
                wood -= 50;
                addPopulation();
                minigameCounter = Math.floor(population / 100);
                day += 1;
            }
        }

        else if (population < 400) {

            if (clothing < 80 || water < 80 || wood < 80) {
                decreasePopulation(0, waterNeeded - water, clothNeeded - clothing, woodNeeded - wood);
                
                game.add.text(centerX - 300, 0, 'Click next to go to the next day!', { fontSize: '50px', fill: '#fff' });
                clothing = 0;
                water = 0;
                wood = 0;
                minigameCounter = Math.floor(population / 100);
                day += 1;
            }

            else {
                water -= 80;
                clothing -= 80;
                wood -= 80;
                addPopulation();
                minigameCounter = Math.floor(population / 100);
                day += 1;
            }
        }

        else if (population < 500) {
            if (clothing < 120 || food < 120 || wood < 120) {
                decreasePopulation(foodNeeded - food, 0, clothNeeded - clothing, woodNeeded - wood);
                game.add.text(centerX - 300, 0, 'Click next to go to the next day!', { fontSize: '50px', fill: '#fff' });
                clothing = 0;
                food = 0;
                wood = 0;
                minigameCounter = Math.floor(population / 100);
                day += 1;
            }

            else {
                food -= 120;
                clothing -= 120;
                wood -= 120;
                addPopulation();
                minigameCounter = Math.floor(population / 100);
                day += 1;
            }
        }

        else if (population < 600) {
            if (clothing < 170 || food < 170 || wood < 170 || water < 170) {
                decreasePopulation(foodNeeded - food, waterNeeded - water, clothNeeded - clothing, woodNeeded - wood);

                game.add.text(centerX - 300, 0, 'Click next to go to the next day!', { fontSize: '50px', fill: '#fff' });
                clothing = 0;
                food = 0;
                wood = 0;
                water = 0;
                minigameCounter = Math.floor(population / 100);
                day += 1;
            }

            else {
                food -= 170;
                clothing -= 170;
                wood -= 170;
                water -= 170;
                addPopulation();
                minigameCounter = Math.floor(population / 100);
                day += 1;
            }
        }

        else if (population < 700) {
            if (clothing < 250 || food < 250 || wood < 250 || water < 250) {
                decreasePopulation(foodNeeded - food, waterNeeded - water, clothNeeded - clothing, woodNeeded - wood);
                
                game.add.text(centerX - 300, 0, 'Click next to go to the next day!', { fontSize: '50px', fill: '#fff' });
                clothing = 0;
                food = 0;
                wood = 0;
                water = 0;
                minigameCounter = Math.floor(population / 100);
                day += 1;
            }

            else {
                food -= 250;
                clothing -= 250;
                wood -= 250;
                water -= 250;
                addPopulation();
                minigameCounter = Math.floor(population / 100);
                day += 1;
            }
        }

        else if (population < 800) {
            if (clothing < 275 || food < 275 || wood < 275 || water < 275) {
                decreasePopulation(foodNeeded - food, waterNeeded - water, clothNeeded - clothing, woodNeeded - wood);
                game.add.text(centerX - 300, 0, 'Click next to go to the next day!', { fontSize: '50px', fill: '#fff' });
                clothing = 0;
                food = 0;
                wood = 0;
                water = 0;
                minigameCounter = Math.floor(population / 100);
                day += 1;
            }

            else {
                food -= 275;
                clothing -= 275;
                wood -= 275;
                water -= 275;
                addPopulation();
                minigameCounter = Math.floor(population / 100);
                day += 1;
            }
        }

        else if (population < 900) {
            if (clothing < 300 || food < 300 || wood < 300 || water < 300) {
                decreasePopulation(foodNeeded - food, waterNeeded - water, clothNeeded - clothing, woodNeeded - wood);
                game.add.text(centerX - 300, 0, 'Click next to go to the next day!', { fontSize: '50px', fill: '#fff' });
                clothing = 0;
                food = 0;
                wood = 0;
                water = 0;
                minigameCounter = Math.floor(population / 100);
                day += 1;
            }

            else {
                food -= 300;
                clothing -= 300;
                wood -= 300;
                water -= 300;
                addPopulation();
                minigameCounter = Math.floor(population / 100);
                day += 1;
            }
        }

        else if (population < 1000) {
            if (clothing < 350 || food < 350 || wood < 350 || water < 350) {
                decreasePopulation(foodNeeded - food, waterNeeded - water, clothNeeded - clothing, woodNeeded - wood);
                game.add.text(centerX - 300, 0, 'Click next to go to the next day!', { fontSize: '50px', fill: '#fff' });
                clothing = 0;
                food = 0;
                wood = 0;
                water = 0;
                minigameCounter = Math.floor(population / 100);
                day += 1;
            }

            else {
                food -= 350;
                clothing -= 350;
                wood -= 350;
                water -= 350;
                addPopulation();
                minigameCounter = Math.floor(population / 100);
                day += 1;
            }
        }
		checkPopulation();		
        next_button = game.add.button(1000, 800, 'next_button', function() {
            if (population > 0){
                game.state.start('story');
            }
        })

    
    }
}
