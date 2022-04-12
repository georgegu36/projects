demo.resources_needed = function() {};
demo.resources_needed.prototype = {
    preload: function() {
        game.load.image('day_page', 'assets/day page.png');
        game.load.image('back_button', 'assets/back button.png');
    },
    create: function() {
        game.add.sprite(0, 0, 'day_page');
        addChangeSceneEventListener();

        if (population < 200) {
            foodNeeded = 30;
            waterNeeded = 30;
            clothNeeded = 0;
            woodNeeded = 0;
        }

        else if (population < 300) {
            foodNeeded = 0;
            waterNeeded = 0;
            clothNeeded = 50;
            woodNeeded = 50;
            
        }

        else if (population < 400) {
            foodNeeded = 0;
            waterNeeded = 80;
            clothNeeded = 80;
            woodNeeded = 80;

        }

        else if (population < 500){
            foodNeeded = 120;
            waterNeeded = 0;
            clothNeeded = 120;
            woodNeeded = 120;

        }

        else if (population < 600){
            foodNeeded = 170;
            waterNeeded = 170;
            clothNeeded = 170;
            woodNeeded = 170;
        }

        else if (population < 700){
            foodNeeded = 250;
            waterNeeded = 250;
            clothNeeded = 250;
            woodNeeded = 250;
        }

        else if (population < 800){
            foodNeeded = 275;
            waterNeeded = 275;
            clothNeeded = 275;
            woodNeeded = 275;
        }

        else if (population < 900){
            foodNeeded = 300;
            waterNeeded = 300;
            clothNeeded = 300;
            woodNeeded = 300;
        }

        else if (population < 1000){
            foodNeeded = 350;
            waterNeeded = 350;
            clothNeeded = 350;
            woodNeeded = 350;
        }

        game.add.text(600, 300, 'Food Needed: ' + foodNeeded, { fontSize: '50px', fill: '#fff'});
        game.add.text(600, 350, 'Water Needed: ' + waterNeeded, { fontSize: '50px', fill: '#fff'});
        game.add.text(600, 400, 'Clothing Needed: ' + clothNeeded, { fontSize: '50px', fill: '#fff'});
        game.add.text(600, 450, 'Wood Needed: ' + woodNeeded, { fontSize: '50px', fill: '#fff'}); 

        var back = game.add.button(700, 900, 'back_button', function() {
            changeScene(null, 1);
        })

        
    },
    update: function() {
    },
}


