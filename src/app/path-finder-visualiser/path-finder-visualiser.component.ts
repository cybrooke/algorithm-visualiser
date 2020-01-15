import { Component, OnInit, Input } from '@angular/core';
import { PathFinderAlgorithmsService } from '../services/path-finder-algorithms.service';

interface Cell {
  id: number,
  type: CellType
}

enum CellType {
  empty, 
  visited,
  wall,
  start, 
  finish,
  shortestPath
}

@Component({
  selector: 'app-path-finder-visualiser',
  templateUrl: './path-finder-visualiser.component.html',
  styleUrls: ['./path-finder-visualiser.component.scss']
})
export class PathFinderVisualiserComponent implements OnInit {
  private _width: number;
  private _height: number;

  @Input() algorithm;
  @Input() speed;
  @Input()
  set width(width: number) {
    this._width = 0.7 * width;
    this.calculateGridDimensions();
  }
  get width() {
    return this._width;
  }
  @Input() 
  set height(height: number) {
    this._height = 0.7 * height;
    this.calculateGridDimensions();
  }
  get height() {
    return this._height;
  }

  CellType = CellType;
  grid: Cell[][] = [];
  gridArray: Cell[] = [];
  gridSize: number;
  gridWidth: number;
  gridHeight: number;
  isPlaying;
  start;
  finish;

  constructor(private pathFinderAlgs: PathFinderAlgorithmsService) { 
  }

  ngOnInit() {
  }

  createGrid() {
    this.pathFinderAlgs.width = this.gridWidth;
    this.pathFinderAlgs.height = this.gridHeight;
    this.grid = [];
    for (let i = 0; i < this.gridHeight; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.gridWidth; j++) {
        this.grid[i][j] = { id: this.pathFinderAlgs.get1D(i, j), type: CellType.empty };
      }
    }
    this.generateMaze();
  }

  calculateGridDimensions() {
    if (!this.width || !this.height) return;
    console.log(this.width, this.height);
    this.gridWidth = Math.floor(this.width / 20);
    this.gridHeight = Math.floor(this.height / 20);

    this.createGrid();
    
  }

  setStart(pos) {
    this.start = pos;
    let {x, y} = this.pathFinderAlgs.get2D(pos); 
    this.grid[x][y].type = CellType.start;
  }

  setFinish(pos) {
    this.finish = pos;
    let {x, y} = this.pathFinderAlgs.get2D(pos); 
    this.grid[x][y].type = CellType.finish;
  }

  private generateGrid(gridArray) {
    gridArray.forEach(cell => {
      let {x, y} = this.pathFinderAlgs.get2D(cell);
      this.grid[x][y] = cell;
    })
  }

  async find() {
    this.isPlaying = true;
    switch(this.algorithm.value) {
      case "bfs": await this.bfs(); break;
      case "dfs": await this.dfs(); break;
      default: return;
    }
    this.isPlaying = false;
  }

  private async bfs() {
    let result = this.pathFinderAlgs.bfs(this.grid, this.start, this.finish);
    
    await this.sleep(this.speed);
    for (let step of result.steps) {
      let {x, y} = step;
      this.grid[x][y].type = CellType.visited;
      await this.sleep(this.speed);
    }
    for (let step of result.shortestPath) {
      let {x, y} = step;
      this.grid[x][y].type = CellType.shortestPath;
      await this.sleep(100);
    }
  }

  private async dfs() {
    let result = this.pathFinderAlgs.dfs(this.grid, this.start, this.finish);

    await this.sleep(this.speed);
    for (let step of result.path) {
      let {x, y} = this.pathFinderAlgs.get2D(step);
      this.grid[x][y].type = CellType.visited;
      await this.sleep(this.speed);
    }
  }

  async generateMaze() {
    this.resetWalls();
    let walls = this.pathFinderAlgs.generateMaze();
    for (let wall of walls) {
      let {x, y} = this.pathFinderAlgs.get2D(wall);
      let cell = this.grid[x][y];
      if (cell.type === CellType.empty)
        this.grid[x][y].type = CellType.wall;
    }
  }

  private resetWalls() {
    for (let i = 0; i < this.gridHeight; i++) {
      for (let j = 0; j < this.gridWidth; j++) {
        this.grid[i][j].type = CellType.empty;
      }
    }
    this.setStart(this.pathFinderAlgs.getRndInteger(0, this.gridWidth * this.gridHeight));
    this.setFinish(this.pathFinderAlgs.getRndInteger(0, this.gridWidth * this.gridHeight));
  }

  sleep(ms) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    );
  }
}
