demo.tutorial_hunting = function() {};
demo.tutorial_hunting.prototype = {
  preload: function(){
    game.load.image('arrow_keys_img', 'assets/arrow keys img.png');
    game.load.image('spacebar_img', 'assets/spacebar img.png');
  },
  create: function(){
    hunting_instructions_text = 'You have 30 seconds to shoot the deer\nas they appear onscreen.\n\nUse your arrow keys to adjust your aim.\nPress the spacebar to shoot.\n\nFood and clothing will be added to your resources\nbased on your score.\n\nPress play to begin.';
    game.stage.backgroundColor = '#fbc280';
    game.add.sprite(1100, 250, 'arrow_keys_img');
    game.add.sprite(915, 500, 'spacebar_img');
    game.add.text(650, 50, 'Tutorial', { font: 'italic 50px Exo 2', fill: '#000' });
    game.add.text(100, 200, hunting_instructions_text, {  font: 'Exo 2', fontSize: '50px', fill: '#000' });
    game.add.button(1200, 800, 'play', function() {
      game.state.start('mg_hunting');
    })
  },
  update: function(){
  }
}