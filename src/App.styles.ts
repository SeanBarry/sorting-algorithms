import { ArrayItem } from "./types";
import styled from "styled-components";

export const BACKGROUND = "#fffffe";
export const BACKGROUND_SECONDARY = "#232946";
export const PRIMARY = "#3da9fc";
export const SECONDARY = "#ef4565";
export const TERTIARY = "#ffc107";

export const BAR_WIDTH = 4;
export const BAR_SPACE = 4;

const Div = styled.div`
  box-sizing: border-box;
`;

export const Wrapper = styled(Div)`
  width: 100%;
  height: 100%;
  background-color: ${BACKGROUND};
  display: flex;

  @media (min-width: 768px) {
    flex-direction: row-reverse;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

type ArrayItemProps = {
  key: number;
  element: ArrayItem;
};

export const ArrayElement = styled.div<ArrayItemProps>`
  width: ${BAR_WIDTH}px;
  margin-left: ${BAR_SPACE}px;
  color: transparent;
  display: inline-block;
  height: ${({ element }) => element.value * 3}px;
  background-color: ${({ element }) => element.colour};
`;

export const ToolBar = styled(Div)`
  background: ${BACKGROUND_SECONDARY};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  height: 100%;
  width: 250px;
  border-right: 3px solid rgb(9 64 103);
  flex-direction: column;

  @media (max-width: 768px) {
    border-right: none;
    width: 100%;
  }
`;

export const ArrayWrapper = styled(Div)`
  padding: 30px;
  width: 100%;
  height: 100%;
  background-color: ${BACKGROUND};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Credits = styled.p`
  font-family: sans-serif;
  font-size: 12px;
  color: #fff;
`;

export const Link = styled.a`
  color: ${SECONDARY};
  font-weight: bold;
  text-decoration: none;

  &:hover,
  &:focus,
  &:active {
    color: #bc2944;
  }
`;

export const Button = styled.button<{ primary?: boolean }>`
  background: ${({ primary }) => (primary ? SECONDARY : BACKGROUND)};
  width: 100%;
  border: none;
  padding: 1rem 2rem;
  margin: 10px 0;
  text-decoration: none;
  color: ${({ primary }) => (primary ? "#fff" : "#2b2c34")};
  font-family: sans-serif;
  font-size: 1rem;
  font-weight: bold;
  line-height: 1;

  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  &:hover {
    background: ${({ primary }) => (primary ? "#bc2944" : "#cfcfcf")};
  }
`;

export const Select = styled.select`
  width: 100%;
  font-family: sans-serif;
  font-size: 1rem;
  font-weight: bold;
  line-height: 1;
  padding: 15px 0px;
  margin: 10px 0px;
  text-align: center;

  &:disabled {
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
  }
`;

export const SliderWrapper = styled(Div)`
  padding: 10px 0px;
  width: 100%;
`;

export const SliderDescription = styled.p`
  font-family: sans-serif;
  color: #fffffe;
  font-size: 1rem;
  font-weight: bold;
  line-height: 1;
  margin: 0px;
`;

export const Slider = styled.input`
  margin: 10px 0;
  height: 25px;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  -webkit-appearance: none;
  width: 100%;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    background: ${SECONDARY};
    cursor: pointer;

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.7;
    background: white;
    cursor: not-allowed;
  }
`;

export const Rows = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Description = styled.div`
  font-size: 16px;
  font-family: sans-serif;
  line-height: 1.8;
  padding: 30px;
  align-self: flex-start;
  justify-content: center;
`;
