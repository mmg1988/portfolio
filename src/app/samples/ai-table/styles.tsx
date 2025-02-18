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
  
  i {
    font-weight: 600;
  }
`;

export const IconButton = styled.button`
  position: absolute;
  bottom: 1em;
  right: 1em;
  font-family: inherit;
  font-size: 1em;
  padding: 0.5em;
  border: 0;
  outline: 0;
  line-height: 0;
  border-radius: 2em;
  background: #E1003E;
  color: rgba(255, 255, 255, 0.72);
  cursor: pointer;

  &:hover {
    background: #ee2c61;
    color: rgba(255, 255, 255, 0.88);
  }

  i {
    font-size: 2em;
  }
`;

export const TableContainer = styled.div`
  --table-background: rgb(255, 255, 255);
  --border-radius: 6px;
  --border-color: rgba(0, 0, 0, 0.15);
  --border-style: 1px solid var(--border-color);
  --hover-color: rgba(0, 0, 0, 0.04);
  background: var(--table-background);
  color: rgba(0, 0, 0, 0.73);
  border-radius: var(--border-radius);
  border: var(--border-style);
  overflow: auto;

  table {
    text-align: left;
    border-spacing: 0;
    width: 100%;
    font-size: 0.875em;
  }

  tr {
    background: var(--table-background);
  }

  th {
    background: var(--table-background);
    font-weight: 500;
    position: sticky;
    top: 0;
    z-index: 2;
  }

  th, td {
    padding: 1em;
    border-bottom: var(--border-style);
    white-space: nowrap;
  }

  tr th:first-child {
    left: 0;
    z-index: 3;
  }

  tr td:first-child {
    background: var(--table-background);
    position: sticky;
    left: 0;
    z-index: 2;
  }

  tr:hover td {
    background: var(--hover-color);
  }
`;