var play_state = {
    create: function() {
        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.jump, this);

        this.pipes = game.add.group();
        this.pipes.createMultiple(30, 'pipe');

        this.tips = game.add.group();
        this.tips.createMultiple(10, 'tip');

        this.timer = this.game.time.events.loop(1500, this.add_row_of_pipes, this);

        this.bogs = this.game.add.sprite(100, 245, 'bogs');
        this.bogs.body.gravity.y = 1000;
        this.bogs.anchor.setTo(-0.2, 0.5);

        // No 'this.score', but just 'score'
        score = 1;
        var style = { font: "30px Arial", fill: "#000000" };
        this.label_score = this.game.add.text(20, 20, "0", style);

        this.jump_sound = this.game.add.audio('jump');

        this.add_row_of_pipes();
    },

    update: function() {
        if (this.bogs.inWorld == false)
            this.restart_game();

        if (this.bogs.angle < 20)
            this.bogs.angle += 1;

        this.game.physics.overlap(this.bogs, this.tips, this.hit_pipe, null, this);
        this.game.physics.overlap(this.bogs, this.pipes, this.hit_pipe, null, this);
    },

    jump: function() {
        if (this.bogs.alive == false)
            return;

        this.bogs.body.velocity.y = -350;
        this.game.add.tween(this.bogs).to({angle: -20}, 100).start();
        this.jump_sound.play();
    },

    hit_pipe: function() {
        if (this.bogs.alive == false)
            return;

        this.bogs.alive = false;
        this.game.time.events.remove(this.timer);

        this.pipes.forEachAlive(function(p){
            p.body.velocity.x = 0;
        }, this);

        this.tips.forEachAlive(function(p){
            p.body.velocity.x = 0;
        }, this);
    },

    restart_game: function() {
        this.game.time.events.remove(this.timer);

        // This time we go back to the 'menu' state
        this.game.state.start('menu');
    },

    add_one_pipe: function(x, y) {
        var pipe = this.pipes.getFirstDead();
        pipe.reset(x, y);
        pipe.body.velocity.x = -200;
        pipe.outOfBoundsKill = true;
    },

    add_tip: function(x, y, rotate) {
        var tip = this.tips.getFirstDead();
        tip.reset(x, y);
        tip.body.velocity.x = -200;
        tip.outOfBoundsKill = true;

        if (rotate && tip.angle == 0)
        {
            tip.anchor.setTo(0.5, 1);
            tip.angle -= 180;
        }
    },

    add_row_of_pipes: function() {
        var hole = Math.floor(Math.random()*6)+1;

        for (var i = 0; i < 10; i++)
            if (i != hole && i != hole + 1 && i != hole + 2)
                if (i == hole - 1)
                    this.add_tip(375, i * 50, false);
                else if (i == hole + 3)
                    this.add_tip(385, i * 50, true);
                else
                    this.add_one_pipe(375, i * 50);

        // No 'this.score', but just 'score'
        score *= Math.random()*-2;
        this.label_score.content = "scoar:"+score;
    }
};