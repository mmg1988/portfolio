import styled from '@emotion/styled';

export const PromptInput = styled.div`
  font-size: 1em;
  font-weight: 500;
  display: inline-flex;
  align-items: flex-start;
  border-radius: 2em;
  background: rgba(0, 0, 0, 0.32);
  color: rgba(255, 255, 255, 0.72);
  width: 100%;
  flex: 300px;
  padding-left: 1em;
  backdrop-filter: blur(12px);

  textarea {
    font-family: inherit;
    color: inherit;
    font-weight: inherit;
    font-size: inherit;
    width: 100%;
    background: transparent;
    outline: 0;
    border: 0;
    resize: none;
    padding: 1em 2em 1em 0.5em;
    height: 100%;
  }

  textarea::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

export const SendButton = styled.div`
  position: absolute;
  bottom: 1em;
  right: 1em;
`;

export const Error = styled.div`
  text-align: center;
  font-size: 1.25em;
`;