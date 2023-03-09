const startCol = 3;

const shapes = {
  straight: [
    [ { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 1, col: 3 } ],
    [ { row: 0, col: 2 }, { row: 1, col: 2 }, { row: 2, col: 2 }, { row: 3, col: 2 } ],
    [ { row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 }, { row: 2, col: 3 } ],
    [ { row: 0, col: 1 }, { row: 1, col: 1 }, { row: 2, col: 1 }, { row: 3, col: 1 } ]
  ],
  square: [
    [ { row: 0, col: 1 }, { row: 0, col: 2 }, { row: 1, col: 1 }, { row: 1, col: 2} ],
    [ { row: 0, col: 1 }, { row: 0, col: 2 }, { row: 1, col: 1 }, { row: 1, col: 2} ],
    [ { row: 0, col: 1 }, { row: 0, col: 2 }, { row: 1, col: 1 }, { row: 1, col: 2} ],
    [ { row: 0, col: 1 }, { row: 0, col: 2 }, { row: 1, col: 1 }, { row: 1, col: 2} ]
  ],
  T: [
    [ { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 2, col: 1} ],
    [ { row: 1, col: 0 }, { row: 0, col: 1 }, { row: 1, col: 1 }, { row: 2, col: 1} ],
    [ { row: 0, col: 1 }, { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2} ],
    [ { row: 0, col: 1 }, { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 2, col: 1} ]
  ],
  L: [
    [ { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 0, col: 2} ],
    [ { row: 0, col: 1 }, { row: 1, col: 1 }, { row: 2, col: 1 }, { row: 2, col: 2} ],
    [ { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 2, col: 0} ],
    [ { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 1, col: 1 }, { row: 2, col: 1} ]
  ],
  J: [
    [ { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 0, col: 0} ],
    [ { row: 0, col: 1 }, { row: 1, col: 1 }, { row: 2, col: 1 }, { row: 0, col: 2} ],
    [ { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 2, col: 2} ],
    [ { row: 0, col: 1 }, { row: 1, col: 1 }, { row: 2, col: 0 }, { row: 2, col: 1} ]
  ],
  S: [
    [ { row: 0, col: 1 }, { row: 0, col: 2 }, { row: 1, col: 0 }, { row: 1, col: 1} ],
    [ { row: 0, col: 1 }, { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 2, col: 2} ],
    [ { row: 2, col: 0 }, { row: 2, col: 1 }, { row: 1, col: 1 }, { row: 1, col: 2} ],
    [ { row: 0, col: 0 }, { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 2, col: 1} ]
  ],
  Z: [
    [ { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 1, col: 1 }, { row: 1, col: 2} ],
    [ { row: 0, col: 2 }, { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 2, col: 1} ],
    [ { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 2, col: 1 }, { row: 2, col: 2} ],
    [ { row: 0, col: 1 }, { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 2, col: 0} ]
  ]
};

/**
 * Represents a tetronimo.
 * @class
 */
class Shape {
  /**
   * Creates a new instance of the Shape class.
   * @constructor
   * @param {Array<Array<Object>>} shape - The shape definition with all its rotation positions.
   */
  constructor(shape) {
    this.boundingBox = [
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false]
    ];

    this.position = {
      row: 0,
      col: startCol
    }

    this.shape = shape;

    this.currentRotation = 0;

    this.set();
  }

  /**
   * Clears the bounding box for the shape. Used before setting a new rotation.
   * @private
   */
  clear() {
    for (let row = 0; row < this.boundingBox.length; row++) {
      for (let col = 0; col < this.boundingBox[row].length; col++) {
        this.boundingBox[row][col] = false;
      }
    }
  }

  /**
   * Sets the bounding box for the shape based on the current rotation.
   * @private
   */
  set() {
    for (const square of this.shape[this.currentRotation]) {
      this.boundingBox[square.row][square.col] = true;
    }
  }

  /**
   * Rotates the shape.
   */
  rotate() {
    this.clear();
    this.currentRotation++;
    if (this.currentRotation > 3) {
      this.currentRotation = 0;
    }
    this.set();
  }
}

export { shapes, Shape };