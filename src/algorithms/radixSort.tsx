import { ELEMENT_COLOURS, setColour, sleep } from "../utils";
import { Highlight, Link, P } from "../App.styles";

import { ArrayItem } from "../types";
import { MAX_SPEED } from "../constants";

const countingSort = async (
  array: Array<ArrayItem>,
  digit: number,
  setArray: (array: Array<ArrayItem>) => void,
  speed: number,
  isLastPass: boolean
) => {
  const sortedArray = new Array(array.length).fill(0);
  const countArray = new Array(10).fill(0);

  const digitColumn = 10 ** digit;

  for (let i = 0; i < array.length; i++) {
    setColour(i, ELEMENT_COLOURS.FOCUSED, array);
    setArray([...array]);
    const countIndex = Math.floor(array[i].value / digitColumn) % 10;
    countArray[countIndex]++;
    await sleep(0);
    setColour(i, ELEMENT_COLOURS.DEFAULT, array);
    setArray([...array]);
  }

  for (let idx = 1; idx < 10; idx++) {
    countArray[idx] += countArray[idx - 1];
  }

  for (let idx = array.length - 1; idx > -1; idx--) {
    setColour(idx, ELEMENT_COLOURS.FOCUSED, array);
    setArray([...array]);
    await sleep(0);
    const countIndex = Math.floor(array[idx].value / digitColumn) % 10;
    countArray[countIndex]--;
    const sortedIndex = countArray[countIndex];

    sortedArray[sortedIndex] = array[idx];
    setColour(idx, ELEMENT_COLOURS.DEFAULT, array);
    setArray([...array]);
  }

  for (let idx = 0; idx < array.length; idx++) {
    setColour(idx, ELEMENT_COLOURS.FOCUSED, array);
    setArray([...array]);
    await sleep(0);
    array[idx] = { ...sortedArray[idx] };

    if (isLastPass) {
      setColour(idx, ELEMENT_COLOURS.SORTED, array);
    } else {
      setColour(idx, ELEMENT_COLOURS.DEFAULT, array);
    }
    setArray([...array]);
    await sleep(MAX_SPEED - speed);

    setArray([...array]);
  }
};

export const radixSort = async (
  array: Array<ArrayItem>,
  setArray: (array: Array<ArrayItem>) => void,
  speed: number
) => {
  if (array.length === 0) {
    return array;
  }

  const maxNumber = Math.max(...array.map((w) => w.value));

  let maxNumberLength = maxNumber.toString().length;

  for (let i = 0; i < maxNumberLength; i++) {
    let isLastPass = i === maxNumberLength - 1;
    await countingSort(array, i, setArray, speed, isLastPass);
  }
};

export const radixSortDescription = (
  <>
    <P>
      <strong>
        Radix Sort - O(d * (n + b)) time complexity. n = length of the input
        array, d = max number digits in largest number, b = base of numbering
        system used
      </strong>
    </P>
    <P>
      This implementation of Radix Sort sorts each number based on its{" "}
      <Link
        href="https://en.wikipedia.org/wiki/Radix"
        target="_blank"
        rel="noopener noreferrer"
      >
        radix
      </Link>{" "}
      at a specific position. This operation is repeated for each digit in the
      numbers, whilst also preserving the order of the list from the previous
      iteration. The algorithm passes over the array to calculate the max
      number, and therefore the maximum number of digits in the array.{" "}
      <strong>E.G.</strong> with the numbers [43, 106, 9, 155] - on the first
      pass the order of the array will change to [4
      <Highlight>3</Highlight>, 15<Highlight>5</Highlight>, 10
      <Highlight>6</Highlight>, <Highlight>9</Highlight>]. They have been sorted
      by the first radix (the right most digit in each number). After the second
      pass a 0 is prefixed before the 9, and this becomes [
      <Highlight>0</Highlight>9, 1<Highlight>0</Highlight>6,{" "}
      <Highlight>4</Highlight>3, 1<Highlight>5</Highlight>5]. After the final
      pass another 0 is prefixed before the 9 and one is prefixed before the 43,
      and this becomes [<Highlight>0</Highlight>09, <Highlight>0</Highlight>43,{" "}
      <Highlight>1</Highlight>06, <Highlight>1</Highlight>55].
    </P>
  </>
);
