demo.tutorial_gameplay = function() {};
demo.tutorial_gameplay.prototype = {
  preload: function(){
    game.load.image('back_button', 'assets/back button.png');
    game.load.image('next_button', 'assets/next button.png');
    game.load.image('home_button', 'assets/home button.png');
    game.load.image('chest', 'assets/chest for resources needed.png');
    game.load.image('sword', 'assets/sword for survival tasks.png');
  },
  create: function(){

    game.add.sprite(1300, 300, 'chest');
    game.add.sprite(1100, 400, 'sword');
     // set background color
     game.stage.backgroundColor = '#fbc280';

     // add title text
     game.add.text(600, 100, 'Tutorial', { font: 'italic 50px Exo 2', fill: '#fff'});
 
     // text
     daily_task_text = 'Each day click the chest for a daily report to learn\nthe resources needed for each day.\n\nClick the sword to choose a survival task.\n\nIf you fail to reach the number of materials needed\neach day, your people will perish.';
     game.add.text(100, 300, daily_task_text, { font: 'Exo 2', fontSize: '50px', fill: '#fff' });
 
     // add home button to direct back to title screen
     home_button = game.add.button(1300, 900, 'home_button', function() {
       game.state.start('title_screen');
   })
 
     // create next button to continue to gameplay instructions
     next_button = game.add.button(1000, 800, 'next_button', function() {
       game.state.start('tutorial_goal');      
   })

    // create back button
    back_button = game.add.button(200, 800, 'back_button', function() {
      game.state.start('tutorial_backstory');
  })
  },
  update: function(){
  }
}