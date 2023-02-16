/**
 * Class representing a collision detector.
 */
class CollisionDetector {
  constructor() {

  }

  /**
   * Checks if the current active shape collides with the edges of the game board or with other occupied squares.
   * @param {Object[]} grid - The game board represented as a 2D array of square objects.
   * @param {Shape} shape - The current active shape to check for collisions.
   * @returns {Object} An object with boolean values indicating if the shape is colliding with the left, right, or bottom edge of the game board.
   */
  colliding(grid, shape) {
    this.activeShapePositions = this.#shapePosition(grid, shape);
    return {
      left: this.#collidingLeft(grid),
      right: this.#collidingRight(grid),
      bot: this.#collidingBot(grid)
    };

  }

  /**
   * Calculates the positions of the active squares in the shape on the game board.
   * @private
   * @param {Object[]} grid - The game board represented as a 2D array of square objects.
   * @param {Shape} shape - The current active shape to calculate positions for.
   * @returns {Object[]} An array of objects with the row and column position of each active square in the shape.
   */
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

  /**
   * Checks if the current active shape is colliding with the right edge of the game board or with other occupied squares on the right side.
   * @private
   * @param {Object[]} grid - The game board represented as a 2D array of square objects.
   * @returns {boolean} True if the shape is colliding with the right edge or with other occupied squares on the right side, false otherwise.
   */
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

  /**
   * Checks if the current active shape is colliding with the left edge of the game board or with other occupied squares on the left side.
   * @private
   * @param {Object[]} grid - The game board represented as a 2D array of square objects.
   * @returns {boolean} True if the shape is colliding with the left edge or with other occupied squares on the left side, false otherwise.
   */
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

  /**
   * Checks if the current active shape is colliding with the bottom edge of the game board or with other occupied squares on the bottom.
   * @private
   * @param {Object[]} grid - The game board represented as a 2D array of square objects.
   * @returns {boolean} True if the shape is colliding with the bottom edge or with other occupied squares on the bottom, false otherwise.
   */
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

  /**
   * Checks if the shape would collide with any occupied squares on the game board after a rotation.
   * @param {Object[]} grid - The game board represented as a 2D array of square objects.
   * @param {Shape} shape - The current active shape before rotation.
   * @param {Shape} rotatedShape - The rotated shape to check for collisions.
   * @returns {boolean} True if the rotated shape would collide with any occupied squares on the game board, false otherwise.
   */
  rotationColliding(grid, shape, rotatedShape) {
    const positions = [];
    const gridRow = shape.position.row;
    const gridCol = shape.position.col;

    for (let row = 0; row < rotatedShape.boundingBox.length; row++) {
      for (let col = 0; col < rotatedShape.boundingBox.length; col++) {
        try {
          if (rotatedShape.boundingBox[row][col]) {
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

    for (const square of positions) {
      try {
        if (grid[square.row][square.col].occupied) {
          return true;
        }
      } catch (e) {
        return true;
      }
    }

    return false;
  }
}

export { CollisionDetector };