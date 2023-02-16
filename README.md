# vanilla-tetris
Simple tetris game in vanilla javascript for learning.

## Usage
Include in your own scripts:
```
import { Tetris } from './src/tetris.mjs'

const container = document.getElementById("#tetris")
const tetris = new Tetris(container, 300);

tetris.init();
```
Try it out by downloading repository and:
```
npm install
npm run dev
```

## Todo
### Features
* Scoring system
* Add all tetronimoes
* Gameplay flow:
    * Start game
    * Game over when tetronimo spawns on occupied square
* UI
    * Custom style
    * Buttons
    * View for next block
    * Points
* Make examples with custum "renderer"
* Debug mode
* Tests
* NPM package
* JSDoc

### Bugs
* blocks on the grid dont fall all the way down to the next occupied square when a row clears
