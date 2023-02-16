class CollisionDetector {
  constructor() {

  }

  colliding(grid, shape) {
    this.activeShapePositions = this.#shapePosition(grid, shape);
    return {
      left: this.#collidingLeft(grid),
      right: this.#collidingRight(grid),
      bot: this.#collidingBot(grid)
    };

  }

  #shapePosition(grid, shape) {
    const positions = [];
    const gridRow = shape.position.row;
    const gridCol = shape.position.col;
    for (let row = 0; row < shape.boundingBox.length; row++) {
      for (let col = 0; col < shape.boundingBox.length; col++) {
        try {
          const square = grid[gridRow + row][gridCol + col];
          if (square.active) {
            positions.push({
              row: gridRow + row,
              col: gridCol + col
            });
          }
        } catch (e) {
          continue;
        }
      }
    }

    return positions;
  }

  #collidingRight(grid) {
    for (const square of this.activeShapePositions) {
      try {
        if (grid[square.row][square.col + 1].occupied) {
          return true;
        }
      } catch (e) {
        return true;
      }
    }
    return false;
  }

  #collidingLeft(grid) {
    for (const square of this.activeShapePositions) {
      try {
        if (grid[square.row][square.col - 1].occupied) {
          return true;
        }
      } catch (e) {
        return true;
      }
    }
    return false;
  }

  #collidingBot(grid) {
    for (const square of this.activeShapePositions) {
      try {
        if (grid[square.row + 1][square.col].occupied) {
          return true;
        }
      } catch (e) {
        return true;
      }
    }
    return false;
  }

  rotationColliding(grid, rotatedShape) {
    const positions = this.#shapePosition(grid, rotatedShape);

    for (const square of positions) {
      console.log(square);
    }
    return false;
  }
}

export { CollisionDetector };