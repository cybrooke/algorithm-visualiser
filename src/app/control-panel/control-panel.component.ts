import { Component, OnInit, Output, EventEmitter } from '@angular/core';

interface Algorithm {
  type: AlgorithmType,
  value: string, 
  viewValue: string
}

interface AlgorithmGroup {
  disabled?: boolean, 
  name: string,
  algorithm: Algorithm[]
}

enum AlgorithmType {
  Sorting,
  PathFinder
}

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {
  @Output() onAlgorithmChange: EventEmitter<Algorithm> = new EventEmitter<Algorithm>();
  @Output() onAnimationPlay: EventEmitter<any> = new EventEmitter<any>();
  @Output() onMazeGeneration: EventEmitter<any> = new EventEmitter<any>();
  @Output() onArraySizeChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() onSpeedChange: EventEmitter<number> = new EventEmitter<number>();
  
  AlgorithmType = AlgorithmType;
  algorithm: Algorithm;
  algorithmGroups: AlgorithmGroup[] = [
    { 
      name: 'Sorting',
      algorithm: [
        { type: AlgorithmType.Sorting, value: "quickSort", viewValue: "Quick Sort" },
        { type: AlgorithmType.Sorting, value: "mergeSort", viewValue: "Merge Sort" },
        { type: AlgorithmType.Sorting, value: "insertionSort", viewValue: "Insertion Sort" },
        { type: AlgorithmType.Sorting, value: "selectionSort", viewValue: "Selection Sort" },
        { type: AlgorithmType.Sorting, value: "bubbleSort", viewValue: "Bubble Sort"},
        { type: AlgorithmType.Sorting, value: "heaoSort", viewValue: "Heap Sort"},
      ]
    },
    {
      name: 'Path Finding',
      algorithm: [
        { type: AlgorithmType.PathFinder, value: "dfs", viewValue: "Depth First Search" },
        { type: AlgorithmType.PathFinder, value: "bfs", viewValue: "Breadth First Search" },
      ]
    }
  ];
  speed: number;
  arraySize: number;
  minSpeed: number = 1;
  maxSpeed: number = 200;

  constructor() { }

  ngOnInit() {
    this.pickAlgorithm(this.algorithmGroups[0].algorithm[0]);
    this.setSpeed(100);
    this.setArraySize(100);
  }

  pickAlgorithm(algorithm) {
    this.algorithm = algorithm;
    this.onAlgorithmChange.emit(this.algorithm);
  }

  play() {
    this.onAnimationPlay.emit(true);
  }

  generateMaze() {
    this.onMazeGeneration.emit();
  }

  setSpeed(speed: number) {
    this.speed = speed;
    this.onSpeedChange.emit(this.maxSpeed - this.speed + this.minSpeed);
  }

  setArraySize(size: number) {
    this.arraySize = size;
    this.onArraySizeChange.emit(this.arraySize);
  }
 
}
