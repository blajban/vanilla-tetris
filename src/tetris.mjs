
import { Renderer } from './renderer.mjs';
import { Game } from './game.mjs';

const defaultProps = {
  width: 10,
  height: 20,
  colors: {
      block: 'red',
      bg: 'aquamarine',
      occupied: 'purple',
      boundingBox: 'lightgray'
  },
  pxWidth: 300
}

/**
 * Class representing a Tetris game.
 */
class Tetris {
  /**
   * Create a Tetris game.
   * @param {HTMLElement} parent - The parent element for the game's renderer.
   * @param {Object} props - Object containing styling properties
   */
  constructor(parent, props = defaultProps) {
    this.props = props;
    this.game = new Game(this.props.width, this.props.height);
    this.renderer = new Renderer(parent, this.game.grid, this.props.width, this.props.pxWidth, this.props.colors);
    this.renderer.render(this.game.grid);
    this.baseTick = 1000;
    this.level = 1;

    this.gameInterval = 0;
    this.levelInterval = 0;
    this.levelCounter = 0;
  }

  /**
   * Sets the level interval for the game.
   * @private
   */
  #setLevelInterval() {
    this.levelInterval = setInterval(() => {
      this.game.moveDown();
      this.renderer.render(this.game.grid);
    }, this.baseTick / this.level);
  }

  /**
   * Initializes the game and sets up the event listeners and game loop.
   */
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
        clearInterval(this.levelInterval);
        this.#setLevelInterval();
      }
      this.levelCounter++;
    }, 50);
  }
  
}


export { Tetris };