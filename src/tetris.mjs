import { shapes, Shape } from './shape.mjs';
import { Renderer } from './renderer.mjs';
import { CollisionDetector } from './collisionDetector.mjs';

const width = 10;
const height = 20;

const rowPoints = 10;



class Game {
  constructor() {
    this.grid = {};
    for (let i = 0; i < height; i++) {
      this.grid[i] = {};
      for (let l = 0; l < width; l++) {
        this.grid[i][l] = {
          active: false,
          occupied: false,
          boundingBox: false
        };
      }
    }
    this.points = 0;
    this.collisionDetector = new CollisionDetector();
    this.blocks = [];
    this.activeShape = new Shape(shapes.straight);
    this.blocks.push(this.activeShape);
    this.#update();
  }

  #clearGrid() {
    for (const row in this.grid) {
      for (const col in this.grid[row]) {
        if (this.grid[row][col].active) {
          this.grid[row][col].active = false;
        }
        if (this.grid[row][col].boundingBox) {
          this.grid[row][col].boundingBox = false;
        }
      }
    }
  }

  #loopBlock(callback) {
    let gridCol = this.activeShape.position.col;
    const gridRow = this.activeShape.position.row;

    for (let row = 0; row < this.activeShape.boundingBox.length; row++) {
      gridCol = this.activeShape.position.col;
      for (let col = 0; col < this.activeShape.boundingBox[row].length; col++) {
        try {
          if (this.activeShape.boundingBox[row][col]) {
            callback(this.grid[gridRow + row][gridCol]);
            gridCol++
            continue;
          }
          this.grid[gridRow + row][gridCol].boundingBox = true;
          gridCol++;
        } catch (e) {
          gridCol++;
          continue;
        }
      }
    }
  }

  #newBlock() {
    this.#loopBlock((square) => {
      square.occupied = true;
    })

    const shapesArr = Object.keys(shapes);
    const randomIndex = Math.floor(Math.random() * shapesArr.length);
    const randomKey = shapesArr[randomIndex]
    this.activeShape = new Shape(shapes[randomKey]);
    this.blocks.push(this.activeShape);
  }

  #checkRows() {
    for (const row in this.grid) {
      let rowFull = 0;
      for (const col in this.grid[row]) {
        if (this.grid[row][col].occupied) {
          rowFull++;
        }

        if (rowFull >= width) {
          this.#clearRow(row);
        }
      }
    }
  }

  #clearRow(rowToClear) {
    for (const col in this.grid[rowToClear]) {
      this.grid[rowToClear][col].occupied = false;
    }

    const occupied = [];

    for (const row in this.grid) {
      for (const col in this.grid[row]) {
        if (this.grid[row][col].occupied || this.grid[row][col].active) {
          occupied.push({
            row: row,
            col: col
          })
        }
      }
    }

    for (const row in this.grid) {
      for (const col in this.grid[row]) {
        if (this.grid[row][col].occupied) {
          this.grid[row][col].occupied = false;
        }
      }
    }

    for (const square of occupied) {
      try {
        this.grid[parseInt(square.row) + 1][square.col].occupied = true;
      } catch (e) {
        continue;
      }
    }

    this.points += rowPoints;
    console.log(this.points);
  }

  #update() {
    this.#clearGrid();
    this.#loopBlock((square) => {
      square.active = true;
    });
  }

  moveDown() {
    if (!this.collisionDetector.colliding(this.grid, this.activeShape).bot) {
      this.activeShape.position.row++;
      this.#update();
      return;
    }

    this.#newBlock();
    this.#checkRows();
  }

  moveRight() {
    if (!this.collisionDetector.colliding(this.grid, this.activeShape).right) {
      this.activeShape.position.col++;
      this.#update();
    }
  }

  moveLeft() {
    if (!this.collisionDetector.colliding(this.grid, this.activeShape).left) {
      this.activeShape.position.col--;
      this.#update();
    }
  }

  rotate() {
    this.activeShape.rotate();
    this.#update();
  }
}


class Tetris {
  constructor(parent, pxWidth) {
    this.game = new Game();
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