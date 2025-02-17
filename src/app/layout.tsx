import type { Metadata } from "next";
import { Roboto as Sans, Roboto_Mono as Mono, Tilt_Neon as Cursive } from "next/font/google";
import "./globals.css";

const fontSans = Sans({
  variable: "--font-sans",
  weight: ['400', '500'],
  subsets: ["latin"]
});

const fontMono = Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const fontCursive = Cursive({
  variable: "--font-cursive",
  weight: '400',
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Mariano Gonzalez - Software Engineer",
  description: "Results-driven Full Stack Developer with extensive experience in .NET technologies, Frontend frameworks, and cloud environments. Skilled in building scalable, high-performance web applications, optimizing system architecture, and collaborating in agile teams. Expertise in responsive web design, UI/UX development, and Figma integrations. Passionate about continuous learning, DevOps best practices, and leveraging modern methodologies for efficient software delivery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} ${fontMono.variable} ${fontCursive.variable}`}>
        {children}
      </body>
    </html>
  );
}
