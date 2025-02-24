import { TableHTMLAttributes } from 'react';
import * as Styles from './styles';

export const Table = ({
  children,
  ...otherProps
}: Readonly<{
  children: React.ReactNode
}> & TableHTMLAttributes<HTMLTableElement>) => {

  
  return (
    <Styles.TableContainer>
      <table {...otherProps}>
        {children}
      </table>
    </Styles.TableContainer>
  );
};