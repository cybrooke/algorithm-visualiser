import { Component, OnInit, Input } from '@angular/core';
import { SortingAlgorithmsService } from '../services/sorting-algorithms.service';

@Component({
  selector: 'app-sorting-visualiser',
  templateUrl: './sorting-visualiser.component.html',
  styleUrls: ['./sorting-visualiser.component.scss']
})
export class SortingVisualiserComponent implements OnInit {
  private _arraySize: number;

  @Input() algorithm;
  @Input() speed: number;
  @Input() width;
  @Input() height;
  @Input() 
  set arraySize(size: number) {
    this._arraySize = size;
    this.generateSortingArray();
  }
  get arraySize() {
    return this._arraySize;
  }

  sortingPoll: any[] = [];
  values: any[] = [];
  isPlaying: boolean = false;

  constructor(private sortingAlgService: SortingAlgorithmsService) { }

  ngOnInit() {
  }

  generateSortingArray() {
    this.isPlaying = false;
    this.sortingPoll = [];
    for(let i = 0; i < this.arraySize; i++) {
      this.sortingPoll.push({value: this.randomIntFromInterval(10, 100), color: ''});
    }
    this.values = this.sortingPoll.map(obj => obj.value);
  }

  sort() {
    this.isPlaying = true;
    switch(this.algorithm.value) {
      case "quickSort": this.quickSort(); break;
      case "mergeSort": this.mergeSort(); break;
      case "insertionSort": this.insertionSort(); break;
      case "selectionSort": this.selectionSort(); break;
      case "bubbleSort": this.bubbleSort(); break;
      default: return;
    }
    this.isPlaying = false;
  }

  async quickSort() {
    let actions = this.sortingAlgService.quickSort(this.values);
    let array = this.sortingPoll;
    for (let action of actions) {
      let i = action.leftPivot;
      let j = action.rightPivot;
      let pivot = action.pivot;

      array[i].color = '#886176';
      array[j].color = '#886176';
      array[pivot].color = 'goldenrod';
      await this.sleep(this.speed);
      if (action.type == 'swap') {
        [array[i], array[j]] = [array[j], array[i]];
      }
      array[i].color = '';
      array[j].color = '';
      array[pivot].color = '';
    }

    this.isPlaying = false;
  }

  async mergeSort() {
    let actions = this.sortingAlgService.mergeSort(this.values);
    let array = this.sortingPoll;
    for (let action of actions) {

      if (action.type == 'moveIndex') {
        array[action.helperLeft].color = '#886176';
        array[action.helperRight].color = '#886176';
        array[action.low].color = '#9d96b8';
        array[action.high].color = '#9d96b8';
        array[action.middle].color = 'goldenrod';
        await this.sleep(this.speed);
        array[action.helperLeft].color = '';
        array[action.helperRight].color = '';
      }

      if (action.type == 'merge') {
        array[action.middle].color = '';
        for (let i = 0; i < action.helper.length; i++) {
          array[action.low + i] = {
            value: action.helper[i],
            color: '#886176'
          }
          array[action.low].color = '#9d96b8';
          array[action.high].color = '#9d96b8';
          await this.sleep(this.speed / 2);
          array[action.low + i].color = '';
        }
        array[action.low].color = '';
        array[action.high].color = '';
      }
    }
    this.isPlaying = false;
  }

  async insertionSort() {
    let actions = this.sortingAlgService.insertionSort(this.values);
    let array = this.sortingPoll;
    let margin;

    for (let action of actions) {
      let index = action.index;

      switch(action.type) {
        case "moveIndex": {
          if (margin) array[margin].color = '';
          array[index].color = '#9d96b8';
          margin = index;
          await this.sleep(this.speed);
        }; break;
        case "swap": {
          array[index].color = '#886176';
          await this.sleep(this.speed / 2);
          array[index + 1].color = '#886176';
          await this.sleep(this.speed / 2);
          [array[index], array[index + 1]] = [array[index + 1], array[index]];
          array[index].color = '';
          await this.sleep(this.speed / 2);
          array[index + 1].color = '';
          array[margin].color = '#9d96b8';
        }; break;
        default: break;
      }
      
    }
  }

  async selectionSort() {
    let actions = this.sortingAlgService.selectionSort(this.values);
    let array = this.sortingPoll;
    let margin;

    for (let action of actions) {
      let index = action.index;

      switch(action.type) {
        case "moveIndex": {
          array[index].color = '#9d96b8';
          margin = index;
          await this.sleep(this.speed);
        }; break;
        case "findMinIndex": {
          array[index].color = '#886176';
          await this.sleep(this.speed / 2);
          array[index].color = '';
        }; break;
        case "swap": {
          let minIndex = action.minIndex;
          array[minIndex].color = '#886176';
          array[margin].color = '#886176';
          await this.sleep(this.speed * 2);
          [array[index], array[minIndex]] = [array[minIndex], array[index]];
          array[minIndex].color = '';
          array[margin].color = '';
        }; break;
        default: break;
      }
    }
  }

  async bubbleSort() {
    let actions = this.sortingAlgService.bubbleSort(this.values);
    let array = this.sortingPoll;

    for (let action of actions) {
      let index = action.index;

      switch(action.type) {
        case "upperLimit": {
          array[index].color = '#9d96b8';
          await this.sleep(this.speed);
        }; break;
        case "moveIndex": {
          array[index].color = '#886176';
          array[index + 1].color = '#886176';
          await this.sleep(this.speed);
          if (array[index].value > array[index + 1].value) 
            [array[index], array[index + 1]] = [array[index + 1], array[index]];
          array[index].color = '';
          array[index + 1].color = '';
        }; break;
        default: break;
      }
    }
  }

  sleep(ms) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    );
  }

  randomIntFromInterval(min: number, max: number): number { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}
