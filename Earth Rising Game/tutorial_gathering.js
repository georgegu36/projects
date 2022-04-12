demo.tutorial_gathering = function() {};
demo.tutorial_gathering.prototype = {
  preload: function(){
    game.load.image('arrow_keys_img', 'assets/arrow keys img.png');
  },
  create: function(){
    gathering_instructions_text = 'You have 30 seconds to gather resources\nas they appear onscreen.\n\nUse your arrow keys to move your basket.\n\nAvoid bombs! Gathering a bomb will subtract from your\ngathered resources.\n\nThe resources you gather will be added to your supply.\n\nPress play to begin.';
    game.stage.backgroundColor = '#fbc280';
    game.add.sprite(1100, 250, 'arrow_keys_img');
    game.add.text(650, 50, 'Tutorial', { font: 'italic 50px Exo 2', fill: '#000' });
    game.add.text(100, 200, gathering_instructions_text, { font: 'Exo 2', fontSize: '50px', fill: '#000' });
    game.add.button(1200, 825, 'play', function() {
      game.state.start('mg_gathering');
    })
  },
  update: function(){
  }
}