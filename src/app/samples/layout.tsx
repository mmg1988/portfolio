import * as Styles from './styles';

export default function SamplesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Styles.Layout>
      {children}
    </Styles.Layout>
  );
}
