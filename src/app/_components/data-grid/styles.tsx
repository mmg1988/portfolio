import styled from '@emotion/styled';

export const SortIcon = styled.span<{ active: boolean, dir: 'asc' | 'desc' }>`
  position: relative;
  font-family: 'Material SYmbols Outlined';
  font-size: 24px;
  width: 1em;
  line-height: 1;

  ${({ active, dir }) => active && `
    ::after {
      content: "${dir === 'asc' ? 'arrow_downward' : 'arrow_upward'}";
    }
  `}
`;