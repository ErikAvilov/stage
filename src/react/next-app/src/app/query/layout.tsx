import type { Metadata } from "next";
import { MyQueryProvider } from "../components/MyQueryProvider";

export const metadata: Metadata = {
	title: "React Query app",
	description: "Polls but with react-query",
};

export default function RootQuery({children}: {children: React.ReactNode;})
{
  return (
	<MyQueryProvider>
		<html lang="en">
			<body>
				{children}
			</body>
		</html>
	</MyQueryProvider>
  );
}