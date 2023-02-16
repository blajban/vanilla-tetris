import { Shape } from '../src/shape.mjs';

describe('Shape class', () => {
    let shape;
  
    beforeEach(() => {
      shape = new Shape([
        [ { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 1, col: 3 } ],
        [ { row: 0, col: 2 }, { row: 1, col: 2 }, { row: 2, col: 2 }, { row: 3, col: 2 } ],
        [ { row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 }, { row: 2, col: 3 } ],
        [ { row: 0, col: 1 }, { row: 1, col: 1 }, { row: 2, col: 1 }, { row: 3, col: 1 } ]
      ]);
    });
  
    it('should initialize correctly', () => {
      expect(shape.boundingBox).toEqual([
        [false, false, false, false],
        [true, true, true, true],
        [false, false, false, false],
        [false, false, false, false]
      ]);
      expect(shape.position).toEqual({
        row: 0,
        col: 3
      });
      expect(shape.shape).toEqual([
        [ { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 1, col: 3 } ],
        [ { row: 0, col: 2 }, { row: 1, col: 2 }, { row: 2, col: 2 }, { row: 3, col: 2 } ],
        [ { row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 }, { row: 2, col: 3 } ],
        [ { row: 0, col: 1 }, { row: 1, col: 1 }, { row: 2, col: 1 }, { row: 3, col: 1 } ]
      ]);
      expect(shape.currentRotation).toBe(0);
    });
  
    it('should clear bounding box', () => {
      shape.clear();
      expect(shape.boundingBox).toEqual([
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false]
      ]);
    });
  
    it('should set bounding box for current rotation', () => {
      shape.set();
      expect(shape.boundingBox).toEqual([
        [false, false, false, false],
        [true, true, true, true],
        [false, false, false, false],
        [false, false, false, false]
      ]);
    });
  
    it('should set bounding box after rotation', () => {
      shape.rotate();
      expect(shape.currentRotation).toBe(1);
      expect(shape.boundingBox).toEqual([
        [false, false, true, false],
        [false, false, true, false],
        [false, false, true, false],
        [false, false, true, false]
      ]);
    });
  });
  