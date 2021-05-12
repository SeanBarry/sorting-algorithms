import * as S from "./App.styles";

import { ArrayItem, SortingAlgorithm } from "./types";
import { MAX_ARRAY_SIZE, MAX_SPEED } from "./constants";
import {
  bubbleSort,
  bubbleSortDescription,
  insertionSort,
  insertionSortDescription,
  quickSort,
  quickSortDescription,
  radixSort,
  radixSortDescription,
  selectionSort,
  selectionSortDescription,
} from "./algorithms";
import { createArrayItem, shuffle } from "./utils";
import { useEffect, useRef, useState } from "react";

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
      case SortingAlgorithm.QuickSort:
        await quickSort(array, setArray, sortSpeed);
        break;
      case SortingAlgorithm.RadixSort:
        await radixSort(array, setArray, sortSpeed);
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
        return bubbleSortDescription;
      case SortingAlgorithm.InsertionSort:
        return insertionSortDescription;
      case SortingAlgorithm.SelectionSort:
        return selectionSortDescription;
      case SortingAlgorithm.QuickSort:
        return quickSortDescription;
      case SortingAlgorithm.RadixSort:
        return radixSortDescription;
    }
  };

  const isAlgoDisabled = (key: SortingAlgorithm) => {
    switch (key) {
      case SortingAlgorithm.MergeSort:
      case SortingAlgorithm.HeapSort:
      case SortingAlgorithm.BogoSort:
        return true;
      default:
        return false;
    }
  };

  return (
    <>
      <Normalize />
      <S.Wrapper>
        <S.Rows>
          <S.ArrayWrapper ref={mainContentWidth}>
            {array.map((w, idx) => (
              <div
                style={{
                  width: `${S.BAR_WIDTH}px`,
                  marginLeft: `${S.BAR_SPACE}px`,
                  color: "transparent",
                  display: "inline-block",
                  height: `${w.value * 3}px`,
                  backgroundColor: w.colour,
                }}
                key={idx}
              />
            ))}
          </S.ArrayWrapper>
          <S.Description>
            <>
              {getAlgorithmDescription()}
              <S.P small>
                <strong>
                  <em>Note: </em>
                </strong>
                Don't infer the speed of each algorithm based on the speed of
                the visualisation. In order for the visualisations to show the
                individual steps in the algorithms, some may have been slowed
                down more than others.
              </S.P>
            </>
          </S.Description>
        </S.Rows>
        <S.ToolBar>
          <S.Select
            value={sortingAlgorithm}
            onChange={(event) => {
              const { value } = event.target;
              const typedValue = value as SortingAlgorithm;
              shuffleArray(arraySize);
              setSortingAlgorithm(typedValue);
            }}
            disabled={inProgress}
          >
            {Object.values(SortingAlgorithm).map((value) => (
              <option
                key={value}
                value={value}
                disabled={isAlgoDisabled(value)}
              >
                {value}
              </option>
            ))}
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
            Made by{" "}
            <S.Link
              href="https://twitter.com/seanbarryuk"
              target="_new"
              rel="noopener nofollow"
            >
              @SeanBarryUK
            </S.Link>
          </S.Credits>
        </S.ToolBar>
      </S.Wrapper>
    </>
  );
};

export default App;
