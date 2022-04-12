demo.tutorial_backstory = function() {};
demo.tutorial_backstory.prototype = {
  preload: function(){
    game.load.image('next_button', 'assets/next button.png');
    game.load.image('home_button', 'assets/home button.png');
  },
  create: function(){

    // set background color
    game.stage.backgroundColor = '#fbc280';

    // add title text
    game.add.text(600, 100, 'Tutorial', { font: 'italic 50px Exo 2', fill: '#fff'});

    // text
    story_text = 'Earth has become overpopulated. Scientists have sent\na group of 100 brave individuals to a newly discovered\nEarth-like planet. Their task is to create a thriving society\nin order to transfer life to the new planet.';
    game.add.text(100, 300, story_text, { font: 'Exo 2', fontSize: '50px', fill: '#fff' });

    // add home button to direct back to title screen
    home_button = game.add.button(1300, 900, 'home_button', function() {
      game.state.start('title_screen');
  })

    // create next button to continue to gameplay instructions
    next_button = game.add.button(1000, 800, 'next_button', function() {
      game.state.start('tutorial_gameplay');      
  })

  },
  update: function(){
  }
}