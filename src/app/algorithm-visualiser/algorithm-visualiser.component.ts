import { Component, OnInit, ViewChild, ElementRef, HostListener, ChangeDetectorRef } from '@angular/core';
import { PathFinderVisualiserComponent } from '../path-finder-visualiser/path-finder-visualiser.component';
import { SortingVisualiserComponent } from '../sorting-visualiser/sorting-visualiser.component';

interface Algorithm {
  type: AlgorithmType,
  value: string, 
  viewValue: string
}

enum AlgorithmType {
  Sorting,
  PathFinder
}

@Component({
  selector: 'app-algorithm-visualiser',
  templateUrl: './algorithm-visualiser.component.html',
  styleUrls: ['./algorithm-visualiser.component.scss']
})
export class AlgorithmVisualiserComponent implements OnInit {

  @ViewChild(PathFinderVisualiserComponent, {static: false})
  private pathFinderComponent: PathFinderVisualiserComponent;
  @ViewChild(SortingVisualiserComponent, {static: false})
  private sortingComponent: SortingVisualiserComponent;
  
  @HostListener('window:resize') 
  onResize() {
    this.getVisualiserDimensions(this.el.nativeElement.children[0].children[1]);
  }

  AlgorithmType = AlgorithmType;
  algorithm: Algorithm;
  isPlaying: boolean;
  speed: number;
  arraySize: number;
  visualiserHeight: number;
  visualiserWidth: number;

  constructor(private el: ElementRef, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    this.getVisualiserDimensions(this.el.nativeElement.children[0].children[1]);
  } 

  getVisualiserDimensions(container: HTMLElement) {
    this.visualiserWidth = container.getBoundingClientRect().width;
    this.visualiserHeight = container.getBoundingClientRect().height;
    this.cdRef.detectChanges();
  }

  setAlgorithm(algorithm: Algorithm) {
    this.algorithm = algorithm;
  }

  play() {
    switch(this.algorithm.type) {
      case AlgorithmType.Sorting: this.sortingComponent.sort(); break;
      case AlgorithmType.PathFinder: this.pathFinderComponent.find(); break;
      default: return;
    }
  }

  generateMaze() {
    this.pathFinderComponent.generateMaze();
  }

  setSpeed(speed: number) {
    this.speed = speed;
  }

  setArraySize(size: number) {
    this.arraySize = size;
  }

}
