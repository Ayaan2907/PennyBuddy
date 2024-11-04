"use client"
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from './components/Header/Header';
import { AuthProvider } from '../app/context/AuthContext';
import '@mantine/core/styles.css';
import { Group, Code, AppShell, Burger} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { List, ThemeIcon, rem } from '@mantine/core';
import { IconCircleCheck, IconCircleDashed } from '@tabler/icons-react';


import { MantineProvider } from '@mantine/core';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata: Metadata = {
//   title: "Penny Buddy",
//   description: "Financial tracking and budgeting app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <html lang="en">

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MantineProvider >
          <AuthProvider>
          <AppShell
    header={{ height: 60 }}
    navbar={{
      width: 300,
      breakpoint: 'sm',
      collapsed: { mobile: !opened,  desktop : opened },
    }}
    padding="md"
  >
    <AppShell.Header>
      <Burger
        opened={opened}
        onClick={toggle}
        hiddenFrom="sm"
        size="sm"
      />
        <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" />
    </AppShell.Header>

      <AppShell.Navbar p="md">
      <List
      spacing="xs"
      size="sm"
      center
      icon={
        <ThemeIcon color="teal" size={24} radius="xl">
          <IconCircleCheck style={{ width: rem(16), height: rem(16) }} />
        </ThemeIcon>
      }
    >
      <List.Item>Home</List.Item>
      <List.Item>Add account</List.Item>
      <List.Item>settings</List.Item>
       <List.Item
        icon={
          <ThemeIcon color="blue" size={24} radius="xl">
            <IconCircleDashed style={{ width: rem(16), height: rem(16) }} />
          </ThemeIcon>
        }
      >
        Submit a pull request once you are done
      </List.Item>
    </List>
    </AppShell.Navbar>
              <AppShell.Main>
                {children}
              </AppShell.Main>
              </AppShell>
          </AuthProvider>
          </MantineProvider>
      </body>
    </html>
  );
}
