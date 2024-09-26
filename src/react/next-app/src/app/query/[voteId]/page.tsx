"use client";

import { ChoiceData, Choices, Vote } from "@/app/interfaces";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";

export default function Page({ params }: { params: { voteId: number; }; }) {
	const [vote, setVote] = useState<number | null>(null);

	const { data: content, error, isLoading } = useQuery<Choices>({
		queryKey: ['polls', params.voteId],
		queryFn: async () => {
			const { data } = await axios.get<Choices>(`http://localhost:8000/polls/${params.voteId}/`);
			return data;
		}
	});

	const mutation = useMutation<Vote, Error, number | null>({
		mutationFn: async (vote: number | null) => {
			const { data } = await axios.patch<Vote>(`http://localhost:8000/polls/${params.voteId}/vote/${vote}`, {
				choice: vote,
			});
			return data;
		},
		onSuccess: (data) => { console.log(data.message) },
		onError: (error) => { console.error(error.message) },
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		mutation.mutate(vote);
	}

	if (error) return <h1>{error.message}</h1>;
	if (isLoading) return <div><h1>Loading...</h1></div>;

	return (
		<div>
			<ul>
				<h1>{content?.question_text}</h1>
				{content?.choices.map((choice: ChoiceData, index: number) => 
					<li key={index}>
						<label htmlFor={'choice' + index}>{choice.choice_text}</label>
						<input onChange={(e: any) => setVote(Number(e.target.value))} type='radio' name='choice' value={choice.id} />
					</li>
				)}
			</ul>
			<button onClick={handleSubmit}>Submit</button>
		</div>
	);
}
