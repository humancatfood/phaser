import './css/main.css';

import { range } from 'lodash';




const Phaser = window.Phaser;


new Phaser.Game(960, 768, Phaser.AUTO, '', {

  preload: game => {
    game.load.spritesheet('target', 'assets/spritesheet.png', 132, 150, 27);
  },

  create: game => {

    console.log("create:", game);
    window.game = game;

    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    const { world } = game;
    const sprite = game.add.sprite(world.width / 2, world.height / 2, 'target');
    sprite.anchor.x = sprite.anchor.y = 0.5;
    sprite.animations.add('walk', range(27), 24, true).play();

  },

  update: game => {
    // console.log("update:", game);
  }

});
