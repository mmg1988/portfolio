'use client'

import styled from '@emotion/styled';

export const Layout = styled.div`
  background: url('/blob-scene-haikei-2.svg') center / cover no-repeat fixed;
  padding: 5vh max((100% - 1440px) / 2, 10vw);
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;

  ::-webkit-scrollbar, *::-webkit-scrollbar {
    width: 14px;
    height: 14px;
  }

  ::-webkit-scrollbar-track, *::-webkit-scrollbar-track {
    background: #3F3F3F;
  }

  ::-webkit-scrollbar-thumb, *::-webkit-scrollbar-thumb {
    background: #7F7F7F;
    border-radius: 12px;
    border: 3px solid transparent;
    background-clip: padding-box;
  }

  ::-webkit-scrollbar-thumb:hover, *::-webkit-scrollbar-thumb:hover {
    background: #9F9F9F;
    border: 3px solid transparent;
    background-clip: padding-box;
  }
`;