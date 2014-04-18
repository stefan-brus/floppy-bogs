'use strict';

var Bird = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'bird', frame);

  // set the sprite's anchor to the center
  this.anchor.setTo(0.5, 0.5);

  // add and play animations
  this.animations.add('flap');
  this.animations.play('flap', 12, true);

  // add physics body
  this.game.physics.arcade.enableBody(this);
};

Bird.prototype = Object.create(Phaser.Sprite.prototype);
Bird.prototype.constructor = Bird;

Bird.prototype.update = function() {
  // check to see if our angle is less than 90
  // if it is rotate the bird towards the ground by 2.5 degrees
  if(this.angle < 90) {
    this.angle += 2.5;
  }
};

Bird.prototype.flap = function() {
    //cause our bird to "jump" upward
    this.body.velocity.y = -400;

    // rotate the bird to -40 degrees
    this.game.add.tween(this).to({angle: -40}, 100).start();
};

module.exports = Bird;
