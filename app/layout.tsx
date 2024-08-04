import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';
import { Toaster } from '@/components/ui/sonner';

import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';
import { ourFileRouter } from './api/uploadthing/core';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Marshal UI',
	description: 'Marketplace de recursos digitales | Alta calidad',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='es'>
			<body className={inter.className}>
				<NextSSRPlugin
					routerConfig={extractRouterConfig(ourFileRouter)}
				/>
				<Navbar />
				{children}
				<Toaster richColors theme='light' closeButton />
			</body>
		</html>
	);
}
