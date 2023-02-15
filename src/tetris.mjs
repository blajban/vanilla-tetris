
import { Renderer } from './renderer.mjs';
import { Game } from './game.mjs';

const width = 10;
const height = 20;

class Tetris {
  constructor(parent, pxWidth) {
    this.game = new Game(width, height);
    this.renderer = new Renderer(parent, this.game.grid, width, pxWidth);
    this.renderer.render(this.game.grid);
    this.baseTick = 1000;
    this.level = 1;

    this.gameInterval = 0;
    this.levelInterval = 0;
    this.levelCounter = 0;
  }

  #setLevelInterval() {
    this.levelInterval = setInterval(() => {
      this.game.moveDown();
      this.renderer.render(this.game.grid);
    }, this.baseTick / this.level);
  }

  init() {
    window.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        this.game.moveLeft();
      }
      if (event.key === 'ArrowRight') {
        this.game.moveRight();
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        this.game.moveDown();
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        this.game.rotate();
      }
      if (event.key === 'Escape') {
        clearInterval(this.levelInterval);
        clearInterval(this.gameInterval);
      }

      this.renderer.render(this.game.grid);
    });

    this.#setLevelInterval();

    this.gameInterval = setInterval(() => {
      if (this.levelCounter > this.level * 300) {
        this.levelCounter = 0;
        this.level++;
        console.log(`Level ${this.level}!`);
        clearInterval(this.levelInterval);
        this.#setLevelInterval();
        
      }
      this.levelCounter++;
    }, 50);
  }
}


export { Tetris };