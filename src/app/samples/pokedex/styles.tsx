import styled from '@emotion/styled';
import icons from './icons';

export const TitleLogo = styled.div`
  align-self: center;
  filter: invert(1);
  margin-bottom: 2em;

  img {
    object-fit: cover;
  }
`;

export const SearchInput = styled.div`
  font-size: 1em;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  border-radius: 2em;
  background: rgba(0, 0, 0, 0.32);
  color: rgba(255, 255, 255, 0.72);
  width: 400px;
  max-width: 100%;
  padding-left: 1em;
  backdrop-filter: blur(12px);

  input {
    font-family: inherit;
    color: inherit;
    font-weight: inherit;
    font-size: inherit;
    width: 100%;
    background: transparent;
    outline: 0;
    border: 0;
    padding: 1em 2em 1em 0.5em;
  }

  input::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
  
  i {
    font-weight: 600;
  }
`;

export const NoResults = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  font-size: 1.5em;
  padding: 2em;

  i {
    font-size: 6em;
    font-weight: 600;
  }
`;

export const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  justify-content: center;
  width: 100%;
`;

export const CardSide = styled.div`
  background: radial-gradient(var(--card-background), rgba(255, 255, 255, 0.06) 100%);
  flex: 1;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
  padding: 0.5em;
  backface-visibility: hidden;
  transition: transform 500ms ease;
`;

export const FrontSide = styled(CardSide)`
  transform: rotateZ(0deg) rotateY(0deg);
  min-height: 0;

  header {
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    padding: 0.5em 1em;
    min-height: 0;
  }

  img {
    width: auto;
    height: auto;
    max-width: 80%;
    object-fit: contain;
    flex: 1;
    min-height: 0;
  }

  main {
    text-align: center;
  }
`;

export const BackSide = styled(CardSide)`
  position: absolute;
  inset: 0;
  transform: rotateZ(-15deg) rotateY(180deg);

  header {
    padding-top: 0.5em;
    text-align: center;
  }

  main {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
`;

export const Card = styled.div<{ type: string }>`
  --card-background: ${({ type }) => icons[type as keyof typeof icons].color}5F;
  width: clamp(250px, 20% - 1em, 300px);
  height: 320px;
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;

  :hover {
    ${FrontSide} {
      transform: rotateZ(-15deg) rotateY(180deg);
    }

    ${BackSide} {
      transform: rotateZ(0deg) rotateY(0deg);
    }
  }
`;

export const Id = styled.span`
  display: inline-block;
  font-size: 0.875em;
  font-weight: 500;
  padding: 0.25em 0.5em;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 1em;
`;

export const Title = styled.div`
  font-size: 1.25em;
  margin: 0.25em 0;
`;

export const TypeIcon = styled.div<{ name: string }>`
  font-family: 'Material SYmbols Outlined';
  font-size: 28px;
  color: ${({ name }) => icons[name as keyof typeof icons].color};
  text-shadow: 1px 1px rgba(0, 0, 0, 0.15);

  ::after {
    content: "${({ name }) => icons[name as keyof typeof icons].icon}";
  }
`;

export const Types = styled.div`
  display: flex;
  gap: 0.5em;
  justify-content: center;
`;

export const Space = styled.div`
  flex: auto;
`;

export const Stats = styled.div`
  font-size: 0.875em;
  background: rgba(0, 0, 0, 0.2);
  padding: 1em;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 0.5em;

  & > div {
    display: flex;
    justify-content: space-between;
  }
`;