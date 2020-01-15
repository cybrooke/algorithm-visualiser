import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortingAlgorithmsService {

  constructor() { }

  /**
   * Split array and swap values
   *
   * @param {Array<number>} array
   * @param {number} [left=0]
   * @param {number} [right=array.length - 1]
   * @returns {number}
   */
  private partition(array: Array<number>, left: number = 0, right: number = array.length - 1, sortingActions) {
    var pivotIndex = Math.floor((right + left) / 2);
    const pivot = array[pivotIndex];
    let i = left;
    let j = right;

    while (i <= j) {
      while (array[i] < pivot) {
        sortingActions.push({
          leftPivot: i,
          rightPivot: j,
          pivot: pivotIndex,
          type: 'moveIndex'
        });
        i++;
      }

      while (array[j] > pivot) {
        sortingActions.push({
          leftPivot: i,
          rightPivot: j,
          pivot: pivotIndex,
          type: 'moveIndex'
        });
        j--;
      }

      if (i <= j) {
        sortingActions.push({
          leftPivot: i,
          rightPivot: j,
          pivot: (pivotIndex == i) ? j : ((pivotIndex == j) ? i : pivotIndex),
          type: 'swap'
        });
        this.swap(array, i, j);
        i++;
        j--;
      }
    }

    return i;
  }

  private swap(array: Array<number>, i: number, j: number) {
    let aux = array[i];
    array[i] = array[j];
    array[j] = aux;
  }

  /**
   * Quicksort implementation
   *
   * @param {Array<number>} array
   * @param {number} [left=0]
   * @param {number} [right=array.length - 1]
   * @returns {Array<number>}
   */
  quickSort(array: Array<number>, left: number = 0, right: number = array.length - 1) {
    let index;
    let sortingActions = [];
    // if (array.length - 1 == right) sortingActions = [];
    if (array.length > 1) {
      index = this.partition(array, left, right, sortingActions);

      if (left < index - 1) {
        sortingActions = [...sortingActions, ...this.quickSort(array, left, index - 1)];
      }

      if (index < right) {
        sortingActions = [...sortingActions, ...this.quickSort(array, index, right)];
      }
    }
    
    return sortingActions;
  }

  mergeSort(array: Array<number>, helper: Array<number> = new Array(array.length), low: number = 0, high: number = array.length - 1) {
    let sortingActions = [];

    if (low < high) {
      const middle = Math.floor(low + (high - low) / 2);
      sortingActions = [...sortingActions, ...this.mergeSort(array, helper, low, middle)];
      sortingActions = [...sortingActions, ...this.mergeSort(array, helper, middle + 1, high)];
      this.merge(array, helper, low, middle, high, sortingActions);
    }

    return sortingActions;
  }

  private merge(array: Array<number>, helper: Array<number>, low: number, middle: number, high: number, sortingActions) {
    for (let i = low; i <= high; i++) {
      helper[i] = array[i];
    }

    let helperLeft = low;
    let helperRight = middle + 1;
    let current = low;

    while (helperLeft <= middle && helperRight <= high) {
      sortingActions.push({
        helperLeft,
        helperRight,
        low, middle, high,
        type: 'moveIndex'
      })
      if (helper[helperLeft] <= helper[helperRight]) {
        array[current] = helper[helperLeft];
        helperLeft++;
      } else {
        array[current] = helper[helperRight];
        helperRight++;
      }
      current++;
    }

    let remaining = middle - helperLeft;
    for (let i = 0; i <= remaining; i++) {
      array[current + i] = helper[helperLeft + i];
    }

    sortingActions.push({
      helper: array.slice(low, high + 1),
      low, 
      middle,
      high,
      type: 'merge'
    })
  }

  insertionSort(arr: number[]) {
    let i, j, key;
    let sortingActions = [];

    for (i = 1; i < arr.length; i++) {
      key = arr[i];

      j = i - 1;
      sortingActions.push({
        index: i,
        type: "moveIndex"
      });
      
      while (j >= 0 && arr[j] > key) {
        sortingActions.push({
          index: j,
          key,
          type: "swap"
        })
        arr[j + 1] = arr[j];
        j--;
      }

      arr[j + 1] = key;
    }

    return sortingActions;
  }

  selectionSort(arr: number[]) {
    let sortingActions = [];
    let n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
      sortingActions.push({
        index: i,
        type: "moveIndex"
      })
      let min_index = i;
      for (let j = i + 1; j < n; j++) {
        sortingActions.push({
          index: j,
          type: 'findMinIndex'
        })
        if (arr[j] < arr[min_index]) min_index = j; 
      } 
      if (min_index != i) {
        sortingActions.push({
          minIndex: min_index,
          index: i,
          type: "swap"
        })
        this.swap(arr, i, min_index);
      }
    }
    console.log(arr)
    return sortingActions;
  }

  bubbleSort(arr: number[]) {
    let sortingActions = [];
    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      sortingActions.push({
        index: n - 1 - i,
        type: 'upperLimit'
      })
      let swapped = false;
      for (let j = 0; j < n - 1 - i; j++ ) {
        sortingActions.push({
          index: j,
          type: 'moveIndex'
        })
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swapped = true;
        }
      }
      if (!swapped) break;
    }

    console.log(arr);
    return sortingActions;
  }

}
