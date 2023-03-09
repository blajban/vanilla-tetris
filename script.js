import { Tetris } from './src/tetris.mjs'

const container = document.getElementById("#tetris")

/*
const props = {
  width: 10,
  height: 20,
  colors: {
    bg: 'lightgray'
  },
  pxWidth: 600,
  debug: true
}
*/
const tetris = new Tetris(container);

tetris.init();

