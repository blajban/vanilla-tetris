import { shapes, Shape } from './shape.mjs';
import { CollisionDetector } from './collisionDetector.mjs';



const rowPoints = 10;


/**
 * Represents a game of Tetris.
 * @constructor
 * @param {number} width - The width of the game grid.
 * @param {number} height - The height of the game grid.
 */
class Game {
  /**
   * Creates the game grid and initializes the game state.
   */
  constructor(width, height) {
    this.width = width;

    this.grid = {};
    for (let i = 0; i < height; i++) {
      this.grid[i] = {};
      for (let l = 0; l < this.width; l++) {
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

  /**
   * Clears the active and bounding box properties of all squares on the game grid.
   * @private
   */
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

  /**
   * Calls a callback function for each square in the active shape's bounding box.
   * @private
   * @param {function} callback - The function to call for each square in the active shape's bounding box.
   */
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

  /**
   * Creates a new active shape and adds it to the blocks array.
   * @private
   */
  #newBlock() {
    this.#loopBlock((square) => {
      square.occupied = true;
    })

    // Move to shapes
    const shapesArr = Object.keys(shapes);
    const randomIndex = Math.floor(Math.random() * shapesArr.length);
    const randomKey = shapesArr[randomIndex]
    this.activeShape = new Shape(shapes[randomKey]);
    this.blocks.push(this.activeShape);
  }

  /**
   * Checks each row on the game grid for completed lines, clears them, and updates the game score.
   * @private
   */
  #checkRows() {
    for (const row in this.grid) {
      let rowFull = 0;
      for (const col in this.grid[row]) {
        if (this.grid[row][col].occupied) {
          rowFull++;
        }

        if (rowFull >= this.width) {
          this.#clearRow(row);
        }
      }
    }
  }

  /**
   * Clears the specified row on the game grid, moves all occupied squares above it down one row, and updates the game score.
   * @private
   * @param {number} rowToClear - The index of the row to clear.
   */
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
  }

  /**
   * Updates the game grid with the active shape's position and bounding box.
   * @private
   */
  #update() {
    this.#clearGrid();
    this.#loopBlock((square) => {
      square.active = true;
      square.color = this.activeShape.color;
    });
  }

  /**
   * Moves the active shape down one row, clears completed rows, and creates a new active shape if necessary.
   */
  moveDown() {
    if (!this.collisionDetector.colliding(this.grid, this.activeShape).bot) {
      this.activeShape.position.row++;
      this.#update();
      return;
    }

    this.#newBlock();
    this.#checkRows();
  }

  /**
   * Moves the active shape to the right.
   */
  moveRight() {
    if (!this.collisionDetector.colliding(this.grid, this.activeShape).right) {
      this.activeShape.position.col++;
      this.#update();
    }
  }

  /**
   * Moves the active shape to the left.
   */
  moveLeft() {
    if (!this.collisionDetector.colliding(this.grid, this.activeShape).left) {
      this.activeShape.position.col--;
      this.#update();
    }
  }

  /**
   * Rotates the active shape.
   */
  rotate() {
    const copy = new Shape(this.activeShape.shape);
    for (let i = 0; i < this.activeShape.currentRotation + 1; i++) {
      copy.rotate();
    }

    if (this.collisionDetector.rotationColliding(this.grid, this.activeShape, copy)) {
      return;
    }

    this.activeShape.rotate();
    this.#update();
  
  }

}

export { Game };

