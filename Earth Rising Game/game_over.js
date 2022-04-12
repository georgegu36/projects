demo.game_over = function() {};
demo.game_over.prototype = {
    preload: function() {
        game.load.image('gameover', 'assets/population progress images/before population progres.png');
        game.load.image('win', 'assets/population progress images/population progress final.png');
  
    },
    create: function() {
        if (population >=1000){
            game.add.image(0, 0, 'win');
            game.add.text(350, 500, 'CONGRATULATIONS! YOU WON THE GAME!', {fontSize: '45px', fill: '#fff'});
            game.add.text(350, 570, 'It took you ' + day + ' days to finish the game.', {fontSize: '45px', fill: '#fff'});
            
        }
        else{
            game.add.image(0, 0, 'gameover');
            game.add.text(centerX - 150, centerY, 'GAME OVER', {fontSize: '100px', fill: '#fff'});   
            game.add.text(centerX - 400, centerY + 150, 'Click the back button below to try again', {fontSize: '45px', fill: '#fff'});
            back_button = game.add.button(1000, 800, 'back_button', function() {
                day = 1;
                population = 100;
                game.state.start('title_screen');
            })
        }
    }
}
