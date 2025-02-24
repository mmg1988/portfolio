'use client'

import { Provider } from 'react-redux';
import * as Styles from './styles';
import { store } from './store';

export default function SamplesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <Styles.Layout>
        {children}
      </Styles.Layout>
    </Provider>
  );
}
