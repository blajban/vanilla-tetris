import { shapes, Shape } from './shape.mjs';
import { CollisionDetector } from './collisionDetector.mjs';



const rowPoints = 10;



class Game {
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

    // Move to shapes
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

        if (rowFull >= this.width) {
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

