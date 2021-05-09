import { PRIMARY, SECONDARY, TERTIARY } from "./App.styles";

import { ArrayItem } from "./types";

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

export const swap = (i: number, j: number, array: Array<ArrayItem>) => {
  const temp = array[j];
  array[j] = array[i];
  array[i] = temp;
};

export const ELEMENT_COLOURS = {
  DEFAULT: PRIMARY,
  SORTED: SECONDARY,
  FOCUSED: TERTIARY,
};

export const createArrayItem = (value: number): ArrayItem => ({
  value,
  colour: PRIMARY,
});

export const sleep = (duration: number): Promise<void> =>
  new Promise((resolve) => setTimeout(() => resolve(), duration));

export const setColour = (
  index: number,
  colour: string,
  array: Array<ArrayItem>
) => {
  const element = array[index];

  if (element) {
    element.colour = colour;
  }
};
