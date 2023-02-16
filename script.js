import { Tetris } from './src/tetris.mjs'

const container = document.getElementById("#tetris")

/*const props = {
    width: 10,
    height: 20,
    colors: {
        block: 'blue',
        bg: 'lightgray',
        occupied: 'purple',
        boundingBox: ''
    },
    pxWidth: 600
  }
*/
const tetris = new Tetris(container);

tetris.init();

