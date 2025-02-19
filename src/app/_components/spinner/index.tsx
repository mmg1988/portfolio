import * as Styles from './styles';

export const Spinner = ({
  size = '1.5em',
  color = 'white'
}: Readonly<{
  size?: string,
  color?: string
}>) => {
  return (
    <Styles.Spinner size={size} color={color}>
      <svg viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
      </svg>
    </Styles.Spinner>
  );
};