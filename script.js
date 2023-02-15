import { Tetris } from './src/tetris.mjs'

const container = document.getElementById("#tetris")
const tetris = new Tetris(container, 300);

tetris.init();

