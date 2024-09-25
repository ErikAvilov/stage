"use client";

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { QuestionData } from '../interfaces';

export default function Home() {
	const router = useRouter();
	const { data, error, isLoading } = useQuery<any>({ 
		queryKey: ['polls'],
		queryFn: async () => {
			const { data } = await axios.get<QuestionData[]>('http://localhost:8000/polls/');
			return data;
		}
	});
	if (error) return <h1>{error.message}</h1>;
	if (isLoading) return <div><h1>Loading...</h1></div>;

	return (
		<div>
			<h1> Polls </h1>
			{data?.results.map((poll: QuestionData) => (
				<li key={poll.id} onClick={() => router.push(`/query/${poll.id}`)}>
					{poll.question_text}
				</li>
			))
			}
		</div>
	);
}