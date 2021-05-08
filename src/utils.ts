import { PRIMARY, SECONDARY, TERTIARY } from "./App.styles";

import { ArrayItem } from "./types";
import { MAX_SPEED } from "./constants";

export const shuffle = (array: Array<any>) => {
  let currentIndex = array.length;
  let tempValue;
  let randomIdx;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIdx = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    tempValue = array[currentIndex];
    array[currentIndex] = array[randomIdx];
    array[randomIdx] = tempValue;
  }

  return array;
};

function swap(i: number, j: number, array: Array<ArrayItem>) {
  const temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}

export const ELEMENT_COLOURS = {
  DEFAULT: PRIMARY,
  SORTED: SECONDARY,
  FOCUSED: TERTIARY,
};

export const createArrayItem = (value: number): ArrayItem => ({
  value,
  isSorted: false,
  inProgress: false,
  colour: PRIMARY,
});

export const sleep = (duration: number): Promise<void> =>
  new Promise((resolve) => setTimeout(() => resolve(), duration));

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

const setColour = (index: number, colour: string, array: Array<ArrayItem>) => {
  const element = array[index];

  if (element) {
    element.colour = colour;
  }
};

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

  setArray(array.map((w) => ({ ...w, isSorted: true })));
};

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
