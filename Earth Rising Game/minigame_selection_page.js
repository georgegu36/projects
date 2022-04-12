demo.minigame_selection_page = function() {};
demo.minigame_selection_page.prototype = {
    preload: function() {
      game.load.image('hunting', 'assets/deer hunting btn image.png', 100, 100);
      game.load.image('fishing', 'assets/fishing btn image.png', 100, 100);
      game.load.image('gathering', 'assets/gather btn image.png', 100, 100);
      game.load.image('logging', 'assets/logging btn image.png', 100, 100);
      game.load.image('back', 'assets/back button.png', 100, 100);
      game.load.image('food', 'assets/food stamp.png');
      game.load.image('water', 'assets/water stamp.png');
      game.load.image('cloth', 'assets/cloth stamp.png');
      game.load.image('wood', 'assets/wood stamp.png', 10, 10);
    },
    create: function() {
      fishing = game.add.sprite()

      // set background color
      game.stage.backgroundColor = '#fbc280';

      // survival task selection
      game.add.text(400, 200, 'Choose Survival Task', {fontSize: '70px', fill: '#fff'});
        
      var mg_1 = game.add.button(100, 370, "hunting", function() {
          game.state.start('tutorial_hunting');
      })
      var food_stamp = game.add.sprite(100, 580, 'food');

      var cloth_stamp = game.add.sprite(160, 580, 'cloth');
      
      
      var mg_2 = game.add.button(400, 400, "fishing", function() {
          game.state.start('tutorial_fishing');
      })
      var food_stamp = game.add.sprite(430, 580, 'food');
      
      var water_stamp = game.add.sprite(480, 585, 'water');
      

      var mg_3 = game.add.button(690, 420, "gathering", function() {
        game.state.start('tutorial_gathering');
      })
      var food_stamp = game.add.sprite(750, 580, 'food');
      
      var water_stamp = game.add.sprite(800, 585, 'water');
      
      var cloth_stamp = game.add.sprite(850, 580, 'cloth');
      
      var wood_stamp = game.add.sprite(910, 580, 'wood')
      

      var mg_4 = game.add.button(1100, 420, "logging", function() {
          game.state.start('tutorial_logging');
        })

      var water_stamp = game.add.sprite(1100, 585, 'water');
     
      var cloth_stamp = game.add.sprite(1150, 580, 'cloth');
      
      var wood_stamp = game.add.sprite(1210, 580, 'wood')
      
      
      var back = game.add.button(700, 800, 'back', function() {
          game.state.start('story');
      })
    },
    update: function() {
    },
}