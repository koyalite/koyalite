import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { Inter } from 'next/font/google';
import 'reactflow/dist/style.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme appearance="dark" accentColor="violet" radius="medium">
          <main className="min-h-screen bg-background">
            {children}
          </main>
        </Theme>
      </body>
    </html>
  );
} 