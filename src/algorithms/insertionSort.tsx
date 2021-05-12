import { ELEMENT_COLOURS, setColour, sleep, swap } from "../utils";

import { ArrayItem } from "../types";
import { MAX_SPEED } from "../constants";
import { P } from "../App.styles";

export const insertionSort = async (
  array: Array<ArrayItem>,
  setArray: (array: Array<ArrayItem>) => void,
  speed: number
) => {
  setColour(0, ELEMENT_COLOURS.SORTED, array);
  setArray([...array]);

  for (let i = 1; i < array.length; i++) {
    let j = i;

    setColour(j, ELEMENT_COLOURS.FOCUSED, array);
    setArray([...array]);

    while (j > 0 && array[j].value < array[j - 1].value) {
      setColour(j, ELEMENT_COLOURS.FOCUSED, array);
      setArray([...array]);
      await sleep(MAX_SPEED - speed);
      swap(j, j - 1, array);
      setColour(j - 1, ELEMENT_COLOURS.SORTED, array);
      setColour(j, ELEMENT_COLOURS.SORTED, array);
      setArray([...array]);
      j--;
    }
    setColour(i, ELEMENT_COLOURS.SORTED, array);
    setArray([...array]);
  }

  setArray(array.map((w) => ({ ...w, colour: ELEMENT_COLOURS.SORTED })));
};

export const insertionSortDescription = (
  <>
    <P>
      <strong>Insertion Sort - O(N^2) average time complexity.</strong>
    </P>
    <P>
      Insertion sort designates a sorted output list at the start of the list.
      To begin with this is just the first value in the unsorted list. The
      algorithm then iterates over the unsorted list. At each iteration, it
      removes one element from the list, and traverses down the sorted list to
      find a location for the item. It repeats, building up a sorted list of
      values on the left hand side, until no unsorted elements remain.
    </P>
  </>
);
