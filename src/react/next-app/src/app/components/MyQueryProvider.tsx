"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const MyQueryProvider= ( {children}: {children: React.ReactNode }) => (
	<QueryClientProvider client={new QueryClient()}>
		{children}
	</QueryClientProvider>
);