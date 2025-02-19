import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`;

export const Spinner = styled.div<{ size: string, color: string }>`
  position: relative;
  display: inline-block;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  
  & svg {
    animation: ${rotate} 1.4s linear infinite;
    z-index: 2;
    position: absolute;
    inset: 0;

    & circle {
      stroke: ${({ color }) => color};
      stroke-linecap: round;
      animation: ${dash} 1.4s ease-in-out infinite;
    }
  }
`;