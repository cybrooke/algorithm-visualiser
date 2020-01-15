import { Injectable } from '@angular/core';

interface Coord {
  x: number, 
  y: number
}

enum CellType {
  empty, 
  visited,
  wall,
  start, 
  end,
  shortestPath
}

@Injectable({
  providedIn: 'root'
})
export class PathFinderAlgorithmsService {

  width: number;
  height: number;

  constructor() {
  }

  bfs(grid, start, target): { found: boolean, steps: Coord[], shortestPath: Coord[] } {
    let queue = [];
    let prev = Array<number>(this.width * this.height);
    let steps: Coord[] = [];
    queue.push(start);

    while (queue.length > 0) {
      let current = queue.shift();
      steps.push(this.get2D(current));
      if (current == target) return { steps, found: true, shortestPath: this.getShortestPath(start, target, prev) };
      for (let adj of this.getAdj(current)) {
        let {x, y} = this.get2D(adj);
        if (grid[x][y].type != CellType.wall && prev[adj] == undefined) {
          prev[adj] = current;
          queue.push(adj);
        }
      }
    }

    return { steps, found: false, shortestPath: null };
  }

  private getShortestPath(start, end, prev: number[]): Coord[] {
    let path = [];
    let current = end;
    path.push(this.get2D(current));
    while (current != start) {
      path.push(this.get2D(prev[current]));
      current = prev[current];
    }

    return path.reverse();
  }

  dfs(grid, start, target): { path: number[], found: boolean } {
    let visitedNodes = [];
    return this._dfs(grid, start, target, visitedNodes);
  }

  private _dfs(grid, current, target, visitedNodes): { path: number[], found: boolean } {
    visitedNodes.push(current);
    if (current == target) return { path: visitedNodes, found: true };
    for (let adj of this.getAdj(current)) {
      let {x, y} = this.get2D(adj);
      if (grid[x][y].type != CellType.wall && !visitedNodes.includes(adj)) {
        let response = this._dfs(grid, adj, target, visitedNodes);
        if (response.found)
          return response;
      }
    }

    return { path: visitedNodes, found: false };
  }

  getAdj(pos): number[] {
    let adj = [];
    let {x, y} = this.get2D(pos);

    if (x > 0)               adj.push(this.get1D(x - 1, y)); // top
    if (x < this.height - 1) adj.push(this.get1D(x + 1, y)); // bottom
    if (y > 0)               adj.push(this.get1D(x, y - 1)); // left
    if (y < this.width - 1)  adj.push(this.get1D(x, y + 1)); // right
    
    return adj;
  }

  get1D(x: number, y: number) {
    return x * this.width + y;
  }

  get2D(pos: number) {
    let x = +Math.floor(pos / this.width);
    let y = pos % this.width;

    return {x, y};
  }

  // generate maze using Prim's Algorithm
  generateMaze() {
    let grid: boolean[][] = [];
    let frontiers = [];

    for (let i = 0; i < this.height; i++) {
      grid[i] = [];
      for (let j = 0; j < this.width; j++) {
        grid[i][j] = false; // wall
      }
    }

    // pick random cell and add its frontiers to the array
    let x = this.getRndInteger(1, this.height - 1);
    let y = this.getRndInteger(1, this.width - 1);
    frontiers.push([x, y, x, y])

    while (frontiers.length > 0) {
      // pick random frontier and remove from array
      let randomIndex = this.getRndInteger(0, frontiers.length);
      let current = frontiers[randomIndex];
      frontiers.splice(randomIndex, 1);
      let x = current[2];
      let y = current[3];

      if (!grid[x][y])
      {
          grid[current[0]][current[1]] = true;
          grid[x][y] = true;
          if ( x >= 3 && !grid[x-2][y] )
              frontiers.push([x-1,y,x-2,y]);
          if ( y >= 3 && !grid[x][y-2] )
              frontiers.push([x,y-1,x,y-2]);
          if ( x < this.height-3 && !grid[x+2][y])
              frontiers.push([x+1,y,x+2,y]);
          if ( y < this.width-3 && !grid[x][y+2] )
              frontiers.push([x,y+1,x,y+2]);
      }
      
    }

    let walls = [];
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (!grid[i][j]) walls.push(this.get1D(i, j));
      }
    }
    return walls;
  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }
  
}
