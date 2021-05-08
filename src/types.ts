export enum SortingAlgorithm {
  BubbleSort = "Bubble Sort",
  InsertionSort = "Insertion Sort",
  SelectionSort = "Selection Sort",
}

export type ArrayItem = {
  value: number;
  isSorted: boolean;
  inProgress: boolean;
  colour: string;
};
