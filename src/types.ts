export enum SortingAlgorithm {
  BubbleSort = "Bubble Sort",
  InsertionSort = "Insertion Sort",
  SelectionSort = "Selection Sort",
  QuickSort = "Quick Sort (Coming soon)",
  MergeSort = "Merge Sort (Coming soon)",
  HeapSort = "Heap Sort (Coming soon)",
  RadixSort = "Radix Sort (Coming soon)",
  BogoSort = "Bogo Sort (Coming soon)",
}

export type ArrayItem = {
  value: number;
  isSorted: boolean;
  inProgress: boolean;
  colour: string;
};
