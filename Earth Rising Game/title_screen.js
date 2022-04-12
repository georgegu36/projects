var play_button;
var how_to_play_button;

demo.title_screen = function() {};
demo.title_screen.prototype = {

  preload: function() {
    game.load.image('title_page', 'assets/title screen background.jpg')
    game.load.image('play', 'assets/play button.png');
    game.load.image('title_text', 'assets/title text.png');
    game.load.image('how_to_play', 'assets/how to play.png');
  },

  create: function() {
    game.add.sprite(0, 0, 'title_page');
    game.add.sprite(centerX - 437, centerY - 100, 'title_text');
    how_to_play_button = game.add.button(1100, 700, 'how_to_play', function() {
      game.state.start('tutorial_backstory');
    })
    play_button = game.add.button(1100, 800, 'play', function() {
      game.state.start('story');
    })
  },

  update: function() {

  }
}