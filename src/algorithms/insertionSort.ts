import { ELEMENT_COLOURS, setColour, sleep, swap } from "../utils";

import { ArrayItem } from "../types";
import { MAX_SPEED } from "../constants";

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
