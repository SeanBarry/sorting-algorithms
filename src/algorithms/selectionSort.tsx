import { ELEMENT_COLOURS, setColour, sleep, swap } from "../utils";

import { ArrayItem } from "../types";
import { MAX_SPEED } from "../constants";
import { P } from "../App.styles";

export const selectionSort = async (
  array: Array<ArrayItem>,
  setArray: (array: Array<ArrayItem>) => void,
  speed: number
) => {
  let currentIdx = 0;

  while (currentIdx < array.length - 1) {
    let smallestIdx = currentIdx;
    setColour(smallestIdx, ELEMENT_COLOURS.FOCUSED, array);
    setArray([...array]);

    for (let i = currentIdx + 1; i < array.length; i++) {
      if (array[i].value < array[smallestIdx].value) {
        setColour(smallestIdx, ELEMENT_COLOURS.DEFAULT, array);
        setColour(i, ELEMENT_COLOURS.FOCUSED, array);
        smallestIdx = i;
        await sleep(MAX_SPEED - speed);
        setArray([...array]);
      }
    }
    swap(currentIdx, smallestIdx, array);
    setColour(currentIdx, ELEMENT_COLOURS.SORTED, array);
    setArray([...array]);
    currentIdx++;
  }

  setArray(array.map((w) => ({ ...w, colour: ELEMENT_COLOURS.SORTED })));
};

export const selectionSortDescription = (
  <>
    <P>
      <strong>Selection Sort - O(N^2) average time complexity.</strong>
    </P>
    <P>
      Selection sort splits the list in to a sorted list and an unsorted list.
      Initially, the sorted list is empty. The algorithm repeatedly iterates
      over the unsorted list, in each iteration storing the index of the
      smallest value. At the end of the iteration, the smallest value will be
      swapped with the first item in the unsorted list. This builds up a sorted
      list of ascending value on the left hand side.
    </P>
  </>
);
