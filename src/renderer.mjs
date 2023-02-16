

/**
 * Renderer class for rendering the Tetris game grid on the DOM.
 */
class Renderer {
  /**
   * Constructs a new Renderer object.
   * 
   * @param {HTMLElement} parent - The parent element to which the grid will be appended.
   * @param {Array<Array<Object>>} grid - The game grid represented as a 2D array of objects.
   * @param {number} width - The width of the game grid in blocks.
   * @param {number} pxWidth - The width of the game grid in pixels.
   */
  constructor(parent, grid, width, pxWidth, colors) {
    this.blockSize = pxWidth / width;
    this.parent = parent;
    this.colors = colors;
    this.bg = document.createElement('div');
    this.bg.style.width = `${pxWidth}px`;
    this.bg.style.fontSize = '0';
    parent.appendChild(this.bg);

    for (const row in grid) {
      for (const col in grid[row]) {
        grid[row][col]['dom'] = document.createElement('div');
        grid[row][col]['dom'].style.backgroundColor = this.colors.bg;
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

  /**
   * Renders the game grid on the DOM.
   * 
   * @param {Array<Array<Object>>} grid - The game grid represented as a 2D array of objects.
   */
  render(grid) {
    for (const row in grid) {
      for (const col in grid[row]) {
        if (grid[row][col].active) {
          grid[row][col].dom.style.backgroundColor = this.colors.block;
          continue;
        } 
        if (grid[row][col].occupied) {
          grid[row][col].dom.style.backgroundColor = this.colors.occupied;
          continue;
        } 
        if (grid[row][col].boundingBox) {
          grid[row][col].dom.style.backgroundColor = this.colors.boundingBox;
          continue;
        }
        
        grid[row][col].dom.style.backgroundColor = this.colors.bg;
        
      }
    }
    
  }
}

export { Renderer };