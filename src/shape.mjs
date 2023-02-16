const startCol = 3;

const shapes = {
  straight: [
    [ { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 1, col: 3 } ],
    [ { row: 0, col: 2 }, { row: 1, col: 2 }, { row: 2, col: 2 }, { row: 3, col: 2 } ],
    [ { row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 }, { row: 2, col: 3 } ],
    [ { row: 0, col: 1 }, { row: 1, col: 1 }, { row: 2, col: 1 }, { row: 3, col: 1 } ]
  ],
  square: [
    [ { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 2, col: 1 }, { row: 2, col: 2} ],
    [ { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 2, col: 1 }, { row: 2, col: 2} ],
    [ { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 2, col: 1 }, { row: 2, col: 2} ],
    [ { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 2, col: 1 }, { row: 2, col: 2} ]
  ],
  T: [
    [ { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 }, { row: 1, col: 1} ],
    [ { row: 1, col: 0 }, { row: 0, col: 1 }, { row: 1, col: 1 }, { row: 2, col: 1} ],
    [ { row: 0, col: 1 }, { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2} ],
    [ { row: 0, col: 0 }, { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 2, col: 0} ]
  ],
  L: [
    [ { row: 0, col: 1 }, { row: 1, col: 1 }, { row: 2, col: 0 }, { row: 2, col: 1} ],
    [ { row: 0, col: 2 }, { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2} ],
    [ { row: 1, col: 1 }, { row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2} ],
    [ { row: 0, col: 0 }, { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 2, col: 0} ]
  ]
};

class Shape {
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

    this.rotation = shape;

    this.currentRotation = 0;

    this.set();
  }

  clear() {
    for (let row = 0; row < this.boundingBox.length; row++) {
      for (let col = 0; col < this.boundingBox[row].length; col++) {
        this.boundingBox[row][col] = false;
      }
    }
  }

  set() {
    for (const square of this.rotation[this.currentRotation]) {
      this.boundingBox[square.row][square.col] = true;
    }
  }

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