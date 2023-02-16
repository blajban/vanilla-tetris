Simple tetris game in vanilla javascript for learning.

# Usage
```
import { Tetris } from './src/tetris.mjs'

const container = document.getElementById("#tetris")
const tetris = new Tetris(container, 300);

tetris.init();
```

# Todo
## Features
* Rotation collision
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
* NPM package

## Bugs
* blocks on the grid dont fall all the way down to the next occupied square when a row clears