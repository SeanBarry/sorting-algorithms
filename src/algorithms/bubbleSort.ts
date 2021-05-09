import { ELEMENT_COLOURS, setColour, sleep, swap } from "../utils";

import { ArrayItem } from "../types";
import { MAX_SPEED } from "../constants";

export const bubbleSort = async (
  array: Array<ArrayItem>,
  setArray: (array: Array<ArrayItem>) => void,
  speed: number
) => {
  let isSorted = false;
  let counter = 0;

  while (!isSorted) {
    isSorted = true;

    for (let i = 0; i < array.length - 1 - counter; i++) {
      let next = array[i + 1];
      let current = array[i];
      setColour(i, ELEMENT_COLOURS.FOCUSED, array);
      setArray([...array]);

      await sleep(MAX_SPEED - speed);

      if (current.value > next.value) {
        swap(i, i + 1, array);
        setArray([...array]);

        isSorted = false;
      }

      setColour(i, ELEMENT_COLOURS.DEFAULT, array);
    }

    counter++;
    setColour(array.length - counter, ELEMENT_COLOURS.SORTED, array);
    setArray([...array]);
  }

  setArray(array.map((w) => ({ ...w, colour: ELEMENT_COLOURS.SORTED })));
};
