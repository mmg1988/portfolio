import styled from '@emotion/styled';

const sizes = {
  'xs': '1em',
  's': '1.25em',
  'md': '1.5em',
  'lg': '2em',
  'xl': '2.5em',
};

export const IconButton = styled.button<{ size: keyof typeof sizes}>`
font-family: inherit;
font-size: 1.125em;
padding: 0.125em;
border: 0;
outline: 0;
line-height: 0;
border-radius: 2em;
background: white;
color: rgba(0, 0, 0, 0.72);
cursor: pointer;

&:hover:not(:disabled) {
  background: #2E2E2E;
  color: rgba(255, 255, 255, 0.72);
}

&:disabled {
  opacity: 0.6;
  cursor: default;
}

i {
  font-size: ${({ size }) => sizes[size]};
}
`;