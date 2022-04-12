demo.tutorial_goal = function() {};
demo.tutorial_goal.prototype = {
  preload: function(){
    game.load.image('back_button', 'assets/back button.png');
    game.load.image('home_button', 'assets/home button.png');
  },
  create: function(){
     // set background color
     game.stage.backgroundColor = '#fbc280';

     // add title text
     game.add.text(600, 100, 'Tutorial', { font: 'italic 50px Exo 2', fill: '#fff'});
 
     // text
     goal_text = 'If you meet the required number of resources each day,\nyour society will grow. Reach a population of 1000 people\nto prove to scientists on Earth that a sustainable society\non the new planet is possible.\n\nClick home and begin.';
     game.add.text(100, 300, goal_text, { font: 'Exo 2', fontSize: '50px', fill: '#fff' });
 
     // add home button to direct back to title screen
     home_button = game.add.button(1300, 900, 'home_button', function() {
       game.state.start('title_screen');
   })

    // create back button
    back_button = game.add.button(200, 800, 'back_button', function() {
      game.state.start('tutorial_gameplay');
  })
  },
  update: function(){
  }
}