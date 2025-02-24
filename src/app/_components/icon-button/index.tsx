import { ButtonHTMLAttributes } from 'react';
import * as Styles from './styles';

export const IconButton = ({
  size = 'md',
  children,
  ...otherProps
}: Readonly<{
  size?: 'xs' | 's' | 'md' | 'lg' | 'xl',
  children: React.ReactNode
}> & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <Styles.IconButton
      size={size}
      {...otherProps}
    >
        {children}
    </Styles.IconButton>
  );
};