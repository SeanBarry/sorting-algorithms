import * as S from "./App.styles";

import { ArrayItem, SortingAlgorithm } from "./types";
import { MAX_ARRAY_SIZE, MAX_SPEED } from "./constants";
import React, { useEffect, useRef, useState } from "react";
import { bubbleSort, createArrayItem, insertionSort, selectionSort, shuffle } from "./utils";

import { Normalize } from "styled-normalize";

const App = () => {
  const [array, setArray] = useState<Array<ArrayItem>>([]);
  const [inProgress, setInProgress] = useState(false);
  const [arraySize, setArraySize] = useState(50);
  const [maxArraySize, setMaxArraySize] = useState(MAX_ARRAY_SIZE);
  const [sortSpeed, setSortSpeed] = useState(Math.floor(MAX_SPEED / 2));
  const [sortingAlgorithm, setSortingAlgorithm] = useState(
    SortingAlgorithm.BubbleSort
  );
  const mainContentWidth = useRef(null);

  useEffect(() => {
    if (
      mainContentWidth &&
      mainContentWidth.current &&
      // @ts-ignore
      mainContentWidth.current.offsetWidth
    ) {
      const number =
        // @ts-ignore
        (mainContentWidth.current.offsetWidth - 80) /
        (S.BAR_WIDTH + S.BAR_SPACE);
      setMaxArraySize(Math.floor(number));
    }
  }, [mainContentWidth]);

  useEffect(() => {
    shuffleArray(arraySize);
  }, [arraySize]);

  const sortArray = async () => {
    setInProgress(true);

    switch (sortingAlgorithm) {
      case SortingAlgorithm.BubbleSort:
        await bubbleSort(array, setArray, sortSpeed);
        break;
      case SortingAlgorithm.SelectionSort:
        await selectionSort(array, setArray, sortSpeed);
        break;
      case SortingAlgorithm.InsertionSort:
        await insertionSort(array, setArray, sortSpeed);
        break;
    }

    setInProgress(false);
  };

  const shuffleArray = async (arraySize: number) => {
    const array: Array<ArrayItem> = Array.from({
      length: arraySize,
    }).map((_, i) => createArrayItem(i + 1));
    const shuffled = shuffle(array);
    setArray(shuffled);
  };

  const getAlgorithmDescription = () => {
    switch (sortingAlgorithm) {
      case SortingAlgorithm.BubbleSort:
        return "Bubble sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. O(n^2) average time complexity.";
      case SortingAlgorithm.InsertionSort:
        return "Insertion sort creates a sorted output list at the start of the array. At each iteration, insertion sort removes one element from the unsorted list, and traverses down the sorted list to find a location for the item. It repeats until no unsorted elements remain. O(n^2) average time complexity.";
      case SortingAlgorithm.SelectionSort:
        return "Selection sort splits the list in to a sorted list and an unsorted list. Initially, the sorted list is empty. The algorithm repeatedly iterates over the unsorted list, in each iteration storing the index of the smallest value. At the end of the iteration, the smallest value will be swapped with the first item in the unsorted list. O(n^2) average time complexity.";
    }
  };

  return (
    <>
      <Normalize />
      <S.Wrapper>
        <S.ToolBar>
          <S.Select
            value={sortingAlgorithm}
            onChange={(event) => {
              const {value} = event.target
              const typedValue = value as SortingAlgorithm
              shuffleArray(arraySize);
              setSortingAlgorithm(typedValue);
            }}
            disabled={inProgress}
          >
            {Object.values(SortingAlgorithm).map(w => (<option key={w} value={w}>{w}</option>))}
          </S.Select>
          <S.SliderWrapper>
            <S.SliderDescription>Array Size</S.SliderDescription>
            <S.Slider
              disabled={inProgress}
              value={arraySize}
              onChange={(val) => {
                setArraySize(Number(val.target.value));
              }}
              type="range"
              min="20"
              max={maxArraySize}
            />
          </S.SliderWrapper>

          <S.SliderWrapper>
            <S.SliderDescription>Sort Speed</S.SliderDescription>
            <S.Slider
              disabled={inProgress}
              value={sortSpeed}
              onChange={(val) => {
                setSortSpeed(Number(val.target.value));
              }}
              type="range"
              min="0"
              max={MAX_SPEED}
            />
          </S.SliderWrapper>
          <S.Button
            disabled={inProgress}
            onClick={() => shuffleArray(arraySize)}
          >
            Shuffle
          </S.Button>
          <S.Button primary disabled={inProgress} onClick={sortArray}>
            Sort
          </S.Button>
          <S.Credits>
            Made by <S.Link href="https://twitter.com/seanbarryuk" target="_new" rel="noopener nofollow">@SeanBarryUK</S.Link>
          </S.Credits>
        </S.ToolBar>
        <S.Rows>
          <S.ArrayWrapper ref={mainContentWidth}>
            {array.map((w) => (
              <S.ArrayElement key={w.value} element={w} />
            ))}
          </S.ArrayWrapper>
          <S.Description>{getAlgorithmDescription()}</S.Description>
        </S.Rows>
      </S.Wrapper>
    </>
  );
};

export default App;
