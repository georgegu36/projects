demo.tutorial_fishing = function() {};
demo.tutorial_fishing.prototype = {
  preload: function(){
    game.load.image('arrow_keys_img', 'assets/arrow keys img.png');
  },
  create: function(){
    fishing_instructions_text = 'You have 30 seconds to catch the fish\nas they appear onscreen.\n\nUse your arrow keys to move your fishing hook.\nBring fish above the dotted line to catch.\n\nFood and water will be added to your resources\nbased on your score.\n\nPress play to begin.';
    game.stage.backgroundColor = '#fbc280';
    game.add.sprite(1140, 350, 'arrow_keys_img');
    game.add.text(650, 50, 'Tutorial', { font: 'italic 50px Exo 2', fill: '#000' });
    game.add.text(100, 200, fishing_instructions_text, { font: 'Exo 2', fontSize: '50px', fill: '#000' });
    game.add.button(1200, 800, 'play', function() {
      game.state.start('mg_fishing');
    })
  },
  update: function(){
  }
}