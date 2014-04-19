'use strict';

var Dolan = function(game) {
  Phaser.Sprite.call(this, game, 0, 0, 'dolan');

  this.game.physics.arcade.enableBody(this);

  this.body.allowGravity = false;
  this.body.immovable = true;

  this.exists = false;
};

Dolan.prototype = Object.create(Phaser.Sprite.prototype);
Dolan.prototype.constructor = Dolan;

Dolan.prototype.update = function() {

  // write your prefab's specific update code here

};

module.exports = Dolan;
