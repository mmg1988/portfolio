import styled from '@emotion/styled';

export const Container = styled.div`
  font-family: var(--font-mono);
  font-size: 14px;
  padding: 1em;
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

export const Service = styled(Container)`
  flex: 1;
  max-width: 100%;
`;

export const Instance = styled.div<{ active: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5em;
  gap: 0.25em;
  width: 6em;
  height: 7em;
  border-radius: 1em;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.12);

    ${({ active }) => `
      &::after {
        content: "${active ? 'stop' : 'play_arrow'}";
        position: absolute;
        top: calc(50%);
        left: calc(50%);
        transform: translate3d(-50%, -50%, 0);
        font-family: 'Material SYmbols Outlined';
        font-size: 48px;
        line-height: 1;
        padding: 0;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.6);
      }
    `}
  }
`;

export const AddInstance = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5em;
  gap: 0.25em;
  width: 6em;
  border-radius: 1em;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    }
`;

export const Queue = styled(Container)`
  height: 100px;
  width: 100%;
  overflow: hidden;
`;

export const Console = styled(Container)`
  font-family: var(--font-mono);
  font-size: 14px;
  gap: 0.5em;
  justify-content: flex-end;
  flex: 35%;
  max-width: 100%;
  height: 300px;
  overflow: hidden;
`;

export const Message = styled.div`
  font-size: 12px;
  text-align: center;
  padding: 4px 4px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.12);
`;

export const IconButton = styled.button`
  font-family: inherit;
  font-size: 1.125em;
  padding: 0.125em;
  font-weight: 700;
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
    font-size: 1em;
  }
`;