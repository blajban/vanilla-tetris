# vanilla-tetris
Simple tetris game in vanilla javascript made for learning.

## Usage
Include in your own scripts:
```
import { Tetris } from './src/tetris.mjs'

const container = document.getElementById("#tetris")
const tetris = new Tetris(container);

tetris.init();
```
You can add custom colors and size like this:
```
const props = {
  width: 10,
  height: 20,
  colors: {
    bg: 'lightgray'
  },
  pxWidth: 600,
  debug: true
}

const tetris = new Tetris(container, props);
```
Try it out by downloading repository and:
```
npm install
npm run dev
```

## Todo
### Features
* Scoring system
* Gameplay flow:
    * Start game
    * Game over when tetronimo spawns on occupied square
* UI
    * Develop custom styling
    * Buttons
    * View for next block
    * Points
* Make examples with custom "renderer"
* Tests
* NPM package
* Update JSDocs

### Bugs
* blocks on the grid dont fall all the way down to the next occupied square when a row clears
