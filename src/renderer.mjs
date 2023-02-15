const colors = {
  block: 'red',
  bg: 'aquamarine',
  occupied: 'purple',
  boundingBox: 'lightgray'
  };

class Renderer {
  constructor(parent, grid, width, pxWidth) {
    this.blockSize = pxWidth / width;
    this.parent = parent;
    this.bg = document.createElement('div');
    this.bg.style.width = `${pxWidth}px`;
    this.bg.style.fontSize = '0';
    parent.appendChild(this.bg);

    for (const row in grid) {
      for (const col in grid[row]) {
        grid[row][col]['dom'] = document.createElement('div');
        grid[row][col]['dom'].style.backgroundColor = colors.bg;
        grid[row][col]['dom'].style.height = `${this.blockSize}px`;
        grid[row][col]['dom'].style.width = `${this.blockSize}px`;
        grid[row][col]['dom'].style.display = 'inline-block';
        
        // debug
        grid[row][col]['dom'].style.color = 'black';
        grid[row][col]['dom'].style.fontSize = '10px';
        grid[row][col]['dom'].innerHTML = `[${row},${col}]`;



        this.bg.appendChild(grid[row][col]['dom']);
      }
    }
  }

  render(grid) {
    for (const row in grid) {
      for (const col in grid[row]) {
        if (grid[row][col].active) {
          grid[row][col].dom.style.backgroundColor = colors.block;
          continue;
        } 
        if (grid[row][col].occupied) {
          grid[row][col].dom.style.backgroundColor = colors.occupied;
          continue;
        } 
        if (grid[row][col].boundingBox) {
          grid[row][col].dom.style.backgroundColor = colors.boundingBox;
          continue;
        }
        
        grid[row][col].dom.style.backgroundColor = colors.bg;
        
      }
    }
    
  }
}

export { Renderer };