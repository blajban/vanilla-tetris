import { Shape } from "../src/shape.mjs";
import { CollisionDetector } from "../src/collisionDetector.mjs";

// TODO

describe('CollisionDetector class', () => {
    let grid, shape, collisionDetector;

  beforeEach(() => {
    grid = [
      [{ active: false, occupied: false }, { active: false, occupied: false }, { active: false, occupied: false }],
      [{ active: false, occupied: false }, { active: false, occupied: false }, { active: false, occupied: false }],
      [{ active: false, occupied: false }, { active: false, occupied: false }, { active: false, occupied: false }],
      [{ active: false, occupied: false }, { active: false, occupied: false }, { active: false, occupied: false }],
      [{ active: false, occupied: false }, { active: false, occupied: false }, { active: false, occupied: false }],
      [{ active: false, occupied: false }, { active: false, occupied: false }, { active: false, occupied: false }],
      [{ active: false, occupied: false }, { active: false, occupied: false }, { active: false, occupied: false }],
      [{ active: false, occupied: false }, { active: false, occupied: false }, { active: false, occupied: false }],
      [{ active: false, occupied: false }, { active: false, occupied: false }, { active: false, occupied: false }],
      [{ active: false, occupied: false }, { active: false, occupied: false }, { active: false, occupied: false }]
    ];
    shape = new Shape([
        [ { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 }, { row: 1, col: 3 } ],
        [ { row: 0, col: 2 }, { row: 1, col: 2 }, { row: 2, col: 2 }, { row: 3, col: 2 } ],
        [ { row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 }, { row: 2, col: 3 } ],
        [ { row: 0, col: 1 }, { row: 1, col: 1 }, { row: 2, col: 1 }, { row: 3, col: 1 } ]
      ]);
      collisionDetector = new CollisionDetector();
    });

    it('should run tests', () => {
        expect(1).toBe(1);
    })
    
})