import { ELEMENT_COLOURS, setColour, sleep, swap } from "../utils";

import { ArrayItem } from "../types";
import { MAX_SPEED } from "../constants";
import { P } from "../App.styles";

export const quickSort = async (
  array: Array<ArrayItem>,
  setArray: (array: Array<ArrayItem>) => void,
  speed: number
) => {
  await quickSortHelper(array, 0, array.length - 1, setArray, speed);

  setArray(array.map((w) => ({ ...w, colour: ELEMENT_COLOURS.SORTED })));
};

const quickSortHelper = async (
  array: Array<ArrayItem>,
  startIdx: number,
  endIdx: number,
  setArray: (array: Array<ArrayItem>) => void,
  speed: number
) => {
  if (startIdx >= endIdx) {
    return;
  }

  const timeToWait = Math.floor((MAX_SPEED - speed) / 4);

  let pivotIdx = startIdx;
  let leftIdx = startIdx + 1;
  let rightIdx = endIdx;

  setColour(pivotIdx, ELEMENT_COLOURS.FOCUSED, array);
  setColour(leftIdx, ELEMENT_COLOURS.FOCUSED, array);
  setColour(rightIdx, ELEMENT_COLOURS.FOCUSED, array);
  setArray([...array]);

  await sleep(timeToWait);

  while (rightIdx >= leftIdx) {
    if (
      array[leftIdx].value > array[pivotIdx].value &&
      array[rightIdx].value < array[pivotIdx].value
    ) {
      swap(leftIdx, rightIdx, array);
      setArray([...array]);
      await sleep(timeToWait);
    }

    if (array[leftIdx].value <= array[pivotIdx].value) {
      setColour(leftIdx, ELEMENT_COLOURS.DEFAULT, array);
      setColour(leftIdx + 1, ELEMENT_COLOURS.FOCUSED, array);
      setArray([...array]);
      await sleep(timeToWait);
      leftIdx += 1;
    }

    if (array[rightIdx].value >= array[pivotIdx].value) {
      setColour(rightIdx, ELEMENT_COLOURS.DEFAULT, array);
      setColour(rightIdx - 1, ELEMENT_COLOURS.FOCUSED, array);
      setArray([...array]);
      await sleep(timeToWait);
      rightIdx -= 1;
    }
  }

  swap(pivotIdx, rightIdx, array);
  setColour(rightIdx, ELEMENT_COLOURS.SORTED, array);
  setColour(pivotIdx, ELEMENT_COLOURS.SORTED, array);
  setColour(leftIdx, ELEMENT_COLOURS.SORTED, array);
  setArray([...array]);
  await sleep(timeToWait);

  let leftSubArrayIsSmaller = rightIdx - 1 - startIdx < endIdx - (rightIdx + 1);

  if (leftSubArrayIsSmaller) {
    await quickSortHelper(array, startIdx, rightIdx - 1, setArray, speed);
    await quickSortHelper(array, rightIdx + 1, endIdx, setArray, speed);
  } else {
    await quickSortHelper(array, rightIdx + 1, endIdx, setArray, speed);
    await quickSortHelper(array, startIdx, rightIdx - 1, setArray, speed);
  }
};

export const quickSortDescription = (
  <>
    <P>
      <strong>Quick Sort - O(N(log(N))) average time complexity.</strong>
    </P>
    <P>
      Quick sort creates a pivot index in the list. In this example, the pivot
      is always the first element. It then iterates over the list, reodering
      elements by swapping the positions of elements that have a lower value
      than the pivot with values that are greater than the pivot's value.
      Eventually a point is reached where all values before are less than the
      pivot, and all values after are greater than the pivot. The pivot then
      swaps positions to this point, and it is in its final sorted position. The
      algorithm is then recursively applied to both remaining lists on each side
      of the pivot, beginning with whichever is the smallest.
    </P>
  </>
);
