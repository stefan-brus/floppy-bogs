var load_state = {
    preload: function() {
        this.game.stage.backgroundColor = '#ffffff';
        this.game.load.image('bogs', 'assets/bogs.png');
        this.game.load.image('pipe', 'assets/pipe.png');
        this.game.load.image('tip', 'assets/pipe_tip.png');
        this.game.load.image('dolan', 'assets/dolan.png');
        this.game.load.audio('jump', 'assets/jump.wav');
    },

    create: function() {
        // When all assets are loaded, go to the 'menu' state
        this.game.state.start('menu');
    }
};