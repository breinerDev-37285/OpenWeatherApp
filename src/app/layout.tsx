import { geistMono, geistSans } from '@/utils/global';
import { Metadata } from 'next';
import { TLayout } from '@interfaces/layout';
import './globals.css';

export const metadata: Metadata = {
  title: "Weather App",
  description: "this is a test weather app",
};

const RootLayout = ({ children }: TLayout) => (
  <html lang="en">
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      {children}
    </body>
  </html>
);

export default RootLayout;
